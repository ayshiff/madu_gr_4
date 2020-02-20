import { IsEmail } from 'class-validator';

export class ForgottenPasswordDto {
  @IsEmail()
  email: string;
}