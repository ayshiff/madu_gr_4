import { IsString, ValidateNested, IsFQDN } from "class-validator";
import { Type } from "class-transformer";
import { Address } from "src/poi/dto/address.dto";

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsString()
  companyName: string;

  @IsFQDN()
  domainName: string;

  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @IsString()
  employees: string;
}
