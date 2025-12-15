import { MinLength, IsEmail, IsNotEmpty } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  name: string;

  @MinLength(4)
  password: string;

  @IsEmail()
  email: string;
}
