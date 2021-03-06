import { ApiProperty } from '@nestjs/swagger';

export class Visit {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  category: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  number: number;
}