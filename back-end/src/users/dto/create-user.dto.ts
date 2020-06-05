import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  workplace: string;

  @IsString()
  department: string;
}