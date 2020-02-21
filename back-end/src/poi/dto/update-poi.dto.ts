import { IsString, IsInt, ValidateNested, IsUrl, IsPhoneNumber, IsEmail, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PoiCategories } from '../model/poi-categories.enum';
import { Address } from "./address.dto";
import { Week } from "./week.dto";

export class UpdatePoiDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(PoiCategories)
  category: string;

  @IsOptional()
  @IsString({each: true})
  poiType: [string];

  @IsOptional()
  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @IsOptional()
  @IsPhoneNumber('FR')
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  siret: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Week)
  openingTime: Week;

  @IsOptional()
  @IsString()
  priceRange: string;

  @IsOptional()
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

  @IsOptional()
  @IsBoolean()
  wheelchair: boolean;

  @IsOptional()
  @IsString()
  status: string;
}