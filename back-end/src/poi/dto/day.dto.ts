import { IsMilitaryTime } from 'class-validator';

export class Day {
  @IsMilitaryTime()
  from: string;

  @IsMilitaryTime()
  to: string;
}