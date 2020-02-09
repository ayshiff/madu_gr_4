import { IsString, IsInt, IsMilitaryTime, ValidateNested, IsUrl, Validate, IsPhoneNumber } from 'class-validator';
import { Type } from 'class-transformer';

class Week {
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

class Day {
  @IsMilitaryTime()
  from: string;

  @IsMilitaryTime()
  to: string;
}

export class CreatePoiDto {
  @IsString()
  name: string;

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

  @ValidateNested()
  @Type(() => Week)
  openingTime: Week;

  @IsString()
  priceRange: string;

  @IsString()
  description: string;

  @IsUrl()
  website: string;
}