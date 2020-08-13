import SignInDto from "../../../api/dtos/signin.dto";

export default interface IAuthService{
    login(user:SignInDto):Promise<string>;
}