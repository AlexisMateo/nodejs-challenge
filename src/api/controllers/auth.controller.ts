import { inject, injectable, Container } from "inversify";
import "reflect-metadata";
import { Request, Response } from 'express';
import IAuthService from "../../domain/interfaces/services/auth.service.interface";
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

        
        let token:string = await InversifyConfig.Init().get<IAuthService>("IAuthService").login(signinRequest);

        response.status(200).send({token});

    }
}