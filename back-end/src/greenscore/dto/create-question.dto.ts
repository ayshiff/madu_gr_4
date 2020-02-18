import { IsString, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Answer {
  @IsString()
  answer: string;

  @IsInt()
  score: number;
}

export class CreateQuestionDto {
  @IsString()
  question: string;

  @IsString()
  questionType: string;

  @ValidateNested()
  @Type(() => Answer)
  answers: Answer[];
}