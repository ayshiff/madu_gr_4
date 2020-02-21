import { IsString, IsInt, ValidateNested, IsUrl, IsPhoneNumber, IsEmail, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PoiCategories } from '../model/poi-categories.enum';
import { Address } from "./address.dto";
import { Week } from "./week.dto";

export class CreatePoiDto {
  @IsString()
  name: string;

  @IsEnum(PoiCategories)
  category: string;

  @IsString({each: true})
  poiType: [string];

  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @IsOptional()
  @IsPhoneNumber('FR')
  phone: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  siret: string;

  @ValidateNested()
  @Type(() => Week)
  openingTime: Week;

  @IsString()
  priceRange: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsUrl()
  website: string;

  @IsOptional()
  @IsUrl()
  socialNetwork: string;

  @IsOptional()
  @IsInt()
  greenscore: number;

  @IsOptional()
  @IsString({each: true})
  foodPreference: [string];

  @IsOptional()
  @IsBoolean()
  takeAway: boolean;

  @IsBoolean()
  wheelchair: boolean;
}