import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class Poi {
  _id: mongoose.Schema.Types.ObjectId;
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  category: string;
  @ApiProperty()
  poiType: [string];
  @ApiProperty()
  address: {
    value: string,
    lat: number,
    lng: number
  };
  @ApiProperty()
  phone: string;
  @ApiProperty()
  email: string;
  siret: string;
  @ApiProperty()
  openingTime: {
    monday: [
      {
        from: string,
        to: string
      }
    ],
    tuesday: [
      {
        from: string,
        to: string
      }
    ],
    wednesday: [
      {
        from: string,
        to: string
      }
    ],
    thursday: [
      {
        from: string,
        to: string
      }
    ],
    friday: [
      {
        from: string,
        to: string
      }
    ],
    saturday: [
      {
        from: string,
        to: string
      }
    ],
    sunday: [
      {
        from: string,
        to: string
      }
    ]
  };
  @ApiProperty()
  priceRange: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  website: string;
  template: {
    id: string,
    name: string,
    questions: [
      {
        id: string,
        question: string,
        answer: string,
        score: number,
      }
    ]
  };
  @ApiProperty()
  socialNetwork: string;
  @ApiProperty()
  greenscore: number;
  @ApiProperty()
  foodPreference: [string];
  @ApiProperty()
  takeAway: boolean;
  @ApiProperty()
  wheelchair: boolean;
  token: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  images: string[];
}