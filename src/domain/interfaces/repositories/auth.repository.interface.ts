import Employee from "../../../api/models/Employee";
import SignInDto from "../../../api/dtos/signin.dto";
import { User } from "../../entities/user.entity";

export default interface IAuthRepository{
    

    findUser(email:string):Promise<User|undefined>;

    createUser(userRequest:SignInDto):Promise<User>;
}