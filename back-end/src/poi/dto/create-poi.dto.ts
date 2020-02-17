import { IsString, IsInt, IsMilitaryTime, ValidateNested, IsUrl, IsPhoneNumber, IsEmail, IsEnum, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { PoiCategories } from '../model/poi-categories.enum';

export class Week {
  @ValidateNested()
  @Type(() => Day)
  monday: Day[];

  @ValidateNested()
  @Type(() => Day)
  tuesday: Day[];

  @ValidateNested()
  @Type(() => Day)
  wednesday: Day[];

  @ValidateNested()
  @Type(() => Day)
  thursday: Day[];

  @ValidateNested()
  @Type(() => Day)
  friday: Day[];

  @ValidateNested()
  @Type(() => Day)
  saturday: Day[];

  @ValidateNested()
  @Type(() => Day)
  sunday: Day[];
}

export class Day {
  @IsMilitaryTime()
  from: string;

  @IsMilitaryTime()
  to: string;
}

export class CreatePoiDto {
  @IsString()
  name: string;

  @IsEnum(PoiCategories)
  category: string;

  @IsString()
  poiType: string;

  @IsString()
  street: string;

  @IsInt()
  zipCode: number;

  @IsString()
  city: string;

  @IsPhoneNumber('FR')
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  siret: string;

  @ValidateNested()
  @Type(() => Week)
  openingTime: Week;

  @IsString()
  priceRange: string;

  @IsString()
  description: string;

  @IsUrl()
  website: string;

  @IsUrl()
  socialNetwork: string;

  @IsInt()
  greenscore: number;

  @IsString()
  foodPreference: string;

  @IsBoolean()
  takeAway: boolean;

  @IsBoolean()
  wheelchair: boolean;
}