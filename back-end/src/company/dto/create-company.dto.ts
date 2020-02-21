import {
  IsString,
  ValidateNested,
  IsFQDN,
  IsEmail,
  IsOptional
} from "class-validator";
import { Type } from "class-transformer";
import { Address } from "src/poi/dto/address.dto";

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  companyName: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsFQDN()
  domainName: string;

  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @IsString()
  employees: string;
}
