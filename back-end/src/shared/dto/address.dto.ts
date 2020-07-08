import { IsString, IsNumber } from 'class-validator';

export class Address {
  @IsString()
  value: string;

  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}