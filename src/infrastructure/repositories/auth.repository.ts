import IAuthRepository from "../../domain/interfaces/repositories/auth.repository.interface";
import { injectable } from "inversify";
import "reflect-metadata";
import { User } from "../../domain/entities/user.entity";
import { Connection, Repository } from "typeorm";
import {getManager} from "typeorm";
import {genSalt,hash,compare} from "bcrypt";
import * as jwt from "jsonwebtoken";
import SignInDto from "../../api/dtos/signin.dto";
import { classToClass, plainToClass } from "class-transformer";


@injectable()
export default class AuthRepository implements IAuthRepository{


     async findUser(email:string):Promise<User|undefined>
     {
        var user = await getManager().findOne(User,{email});

        return user;
     }

     async createUser(userRequest:SignInDto):Promise<User>
     {
        let user:User = new User(userRequest.email,userRequest.password);

        return await getManager().save(user);
     }

}