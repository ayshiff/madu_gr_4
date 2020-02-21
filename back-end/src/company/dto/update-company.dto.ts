import { IsString, ValidateNested, IsOptional, IsFQDN } from "class-validator";
import { Type } from "class-transformer";
import { Address } from "src/poi/dto/address.dto";

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  companyName: string;

  @IsOptional()
  @IsFQDN()
  domainName: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @IsOptional()
  @IsString()
  employees: string;

  @IsOptional()
  @IsString()
  status: string;
}
