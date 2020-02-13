import { IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTemplateDto {
  @IsString()
  name: string;

  @IsString({each: true})
  questions: string[];
}