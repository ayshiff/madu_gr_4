import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class Question {
  @IsString()
  questin_id: string;

  @IsString()
  answer_id: string;
}

export class AnswerPoiGreenscoreDto {
  @ValidateNested()
  @Type(() => Question)
  questions: Question[];
}