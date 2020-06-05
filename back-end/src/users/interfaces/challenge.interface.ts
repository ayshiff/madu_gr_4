import { ApiProperty } from "@nestjs/swagger";

export class Challenge {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  category: string;
  @ApiProperty()
  date: string;
  @ApiProperty()
  photo: string;
}