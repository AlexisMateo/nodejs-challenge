import { injectable, inject } from "inversify";
import "reflect-metadata";
import { encode } from "js-base64";

import IAuthService from "../interfaces/services/auth.service.interface";
import IAuthRepository from "../interfaces/repositories/auth.repository.interface";
import { User } from "../entities/user.entity";
import SignInDto from "../../api/dtos/signin.dto";
import { compare } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { getManager } from "typeorm";
import IAzureService from "../interfaces/services/azure.service.interface";
import { CustomException } from "../../api/models/custom.execption";
import log from "../../configuration/logger";

@injectable()
export default class AuthService implements IAuthService {
  @inject("IAuthRepository")
  userRepository!: IAuthRepository;

  @inject("IAzureService")
  azureService!: IAzureService;

  public AuthService() {}

  async login(userRequest: SignInDto): Promise<string> {
    let user = await this.userRepository.findUser(userRequest.email);

    if (user) {
      log.info("User Exist")

      return this.tryGetToken(userRequest, user);

    } else {

      log.info("User No Exist");

      return this.createUser(userRequest);
    }
  }

  private async createUser(userRequest: SignInDto): Promise<string> {
    
    log.info("creating a new User");
    
    var newUser = new User(userRequest.email, userRequest.password);

    await getManager().save(newUser);


    log.info("seding welcome email");

    this.azureService.SendToQueue(encode(userRequest.email));

    return this.generateToken(newUser.email);
  }

  private async tryGetToken(userRequest: SignInDto,user: User): Promise<string> {

    let isCorrectPass: Boolean = await compare( userRequest.password, user.password );

    if (!isCorrectPass) {

      log.warn("wrong user password");

      throw new CustomException("Oops! wrong password",401);
      
    } else {
      return this.generateToken(userRequest.email);
    }

  }

  private generateToken(email: string): string {
    const token = jwt.sign({ email }, "supersecretvalue", {
      expiresIn: "1h",
    });
    return token;
  }
}
