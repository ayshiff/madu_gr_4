import { IsString, IsInt, IsFQDN } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsFQDN()
  domainName: string;

  @IsString()
  street: string;

  @IsInt()
  zipCode: number;

  @IsString()
  city: string;
}