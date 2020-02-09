import * as mongoose from 'mongoose';

export const PoiSchema = new mongoose.Schema({
  id: String,
  name: String,
  type: String,
  street: String,
  zipCode: Number,
  city: String,
  phone: String,
  openingTime: {
    monday: [
      {
        from: String,
        to: String
      }
    ],
    tuesday: [
      {
        from: String,
        to: String
      }
    ],
    wednesday: [
      {
        from: String,
        to: String
      }
    ],
    thursday: [
      {
        from: String,
        to: String
      }
    ],
    friday: [
      {
        from: String,
        to: String
      }
    ],
    saturday: [
      {
        from: String,
        to: String
      }
    ],
    sunday: [
      {
        from: String,
        to: String
      }
    ]
  },
  priceRange: String,
  description: String,
  website: String
});