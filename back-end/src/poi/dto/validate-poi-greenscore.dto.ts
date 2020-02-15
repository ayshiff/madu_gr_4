import { IsBoolean } from 'class-validator';

export class ValidatePoiGreenscoreDto {
  @IsBoolean()
  valid: boolean;
}