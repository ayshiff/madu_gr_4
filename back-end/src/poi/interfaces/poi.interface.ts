import { ApiProperty } from '@nestjs/swagger';

export class Poi {
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
  content: string;
  @ApiProperty()
  socialNetwork: string;
  token: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  visits: number;
  @ApiProperty()
  likes: string[];
  @ApiProperty()
  images: string[];
}