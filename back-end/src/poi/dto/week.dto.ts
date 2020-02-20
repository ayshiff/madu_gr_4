import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Day } from './day.dto';

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