import { IsString } from 'class-validator';

export class AdviceDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  category: string;

  @IsString()
  photo: string;
}
