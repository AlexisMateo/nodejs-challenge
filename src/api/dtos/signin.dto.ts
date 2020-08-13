import { Expose } from 'class-transformer';

export default class SignInDto {
    @Expose() email!: string;
    @Expose() password!: string;
}