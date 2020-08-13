import {Router} from 'express';
import AuthController from '../../api/controllers/auth.controller';


 class AuthRoute { 

    public authController: AuthController = new AuthController();
    public router = Router();

    constructor(){
        this.router.post('/signin', this.authController.signin);
    }

}

export default new AuthRoute();