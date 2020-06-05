import { IsString, IsNumber } from 'class-validator';

export class ChallengeDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  content: string;

  @IsString()
  category: string;

  @IsNumber()
  points: number;

  @IsString()
  photo: string;
}
