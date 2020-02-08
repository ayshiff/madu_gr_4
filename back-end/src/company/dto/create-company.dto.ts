import { IsString, IsInt } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsString()
  domainName: string;

  @IsString()
  street: string;

  @IsInt()
  zipCode: number;

  @IsString()
  city: string;
}