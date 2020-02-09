import * as mongoose from 'mongoose';

export interface Poi {
  _id: mongoose.Schema.Types.ObjectId;
  id: string;
  name: string;
  poiType: string;
  street: string;
  zipCode: number;
  city: string;
  phone: string;
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
  priceRange: string;
  description: string;
  website: string;
  template_id: mongoose.Schema.Types.ObjectId;
  token: string;
}