import { IsString, IsBoolean } from 'class-validator';

export class CreatePoiGreenscoreDto {
  @IsString()
  template: string;

  @IsBoolean()
  sendToPoi: boolean;
}