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
      return this.tryGetToken(userRequest, user);
    } else {
      return this.createUser(userRequest);
    }
  }

  private async createUser(userRequest: SignInDto): Promise<string> {
    var newUser = new User(userRequest.email, userRequest.password);

    await getManager().save(newUser);

    const encodedEmail = encode(userRequest.email);
    this.azureService.SendToQueue(encodedEmail);

    return this.generateToken(newUser.email);
  }

  private async tryGetToken(userRequest: SignInDto,user: User): Promise<string> {

    let isCorrectPass: Boolean = await compare( userRequest.password, user.password );

    if (!isCorrectPass) {
      throw new Error("Oops! wrong password");
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
