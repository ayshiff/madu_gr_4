import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Participant } from './participant.interface';

export class Challenge {
  _id: mongoose.Schema.Types.ObjectId;
  @ApiProperty()
  id: string;
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
