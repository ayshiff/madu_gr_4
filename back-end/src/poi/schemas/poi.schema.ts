import * as mongoose from 'mongoose';

export const PoiSchema = new mongoose.Schema({
  id: String,
  name: String,
  poiType: String,
  street: String,
  zipCode: Number,
  city: String,
  phone: String,
  email: String,
  siret: String,
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
  website: String,
  template: {
    id: String,
    name: String,
    questions: [
      {
        id: String,
        question: String,
        answer: String,
        score: Number,
      }
    ]
  },
  greenscore: Number,
  token: String,
  status: String
});