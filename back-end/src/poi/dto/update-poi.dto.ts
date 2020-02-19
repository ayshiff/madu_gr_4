import { IsString, ValidateNested, IsPhoneNumber, IsEmail, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { Week } from "./create-poi.dto";

export class UpdatePoiDto {
  @IsOptional()
  @IsPhoneNumber('FR')
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string;

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
  @IsInt()
  greenscore: number;
}