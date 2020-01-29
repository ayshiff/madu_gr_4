import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  company_id: string;
}