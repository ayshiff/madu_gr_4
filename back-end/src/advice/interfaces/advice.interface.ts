import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class Advice {
  _id: mongoose.Schema.Types.ObjectId;
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  category: string;
  @ApiProperty()
  photo: string;
}
