import { IsString, IsNumber, IsDate, IsDateString } from 'class-validator';

export class ChallengeDto {
  @IsDateString()
  startDate: string;

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
