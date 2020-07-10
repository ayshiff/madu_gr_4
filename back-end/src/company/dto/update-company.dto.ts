import { IsString, ValidateNested, IsOptional, IsFQDN } from "class-validator";
import { Type } from "class-transformer";
import { Address } from "src/shared/dto/address.dto";

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

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
