import { inject, injectable, Container } from "inversify";
import "reflect-metadata";
import { Request, Response } from 'express';
import IAuthService from "../../domain/interfaces/services/auth.service.interface";
import Employee from "../models/Employee";
import InversifyConfig from '../../configuration/InversifyConfig';
import { plainToClass } from "class-transformer";
import SignInDto from "../dtos/signin.dto";

@injectable()
export default class AuthController{

    @inject("IAuthService") 
    employeeService!: IAuthService;
    
    public AuthController(){}

    public async signin(request:Request,response:Response){

        let signinRequest:SignInDto=  plainToClass(SignInDto, request.body);

        try {
            
            let token:string = await InversifyConfig.Init().get<IAuthService>("IAuthService").login(signinRequest);

            response.status(200).send({token});

        } catch (error) {

            response.status(500).send({errror:error.message});
            console.log(error)
            
        }

    }
}