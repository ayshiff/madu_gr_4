import { ApiProperty } from '@nestjs/swagger';
import { Participant } from './participant.interface';

export class Challenge {
  @ApiProperty()
  id: string;
  startDate: Date;
  endDate: Date;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  category: string;
  @ApiProperty()
  points: number;
  @ApiProperty()
  photo: string;
  @ApiProperty()
  participants: Participant[];
}
