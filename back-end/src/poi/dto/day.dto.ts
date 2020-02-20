import { IsMilitaryTime, IsOptional } from 'class-validator';

export class Day {
  @IsOptional()
  @IsMilitaryTime()
  from: string;

  @IsOptional()
  @IsMilitaryTime()
  to: string;
}