import { IsString, ValidateNested, IsFQDN, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Address } from 'src/poi/dto/address.dto';

export class CreateCompanyDto {
  @IsString()
  name: string;

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

  @IsOptional()
  @IsString({each: true})
  workplaces: string[];

  @IsOptional()
  @IsString({each: true})
  departments: string[];
}
