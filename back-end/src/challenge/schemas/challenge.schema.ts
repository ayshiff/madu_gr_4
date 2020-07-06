import * as mongoose from 'mongoose';

export const ChallengeSchema = new mongoose.Schema({
  id: String,
  startDate: String,
  title: String,
  description: String,
  content: String,
  category: String,
  points: Number,
  photo: String,
  participants: [
    {
      id: String,
      firstname: String,
      lastname: String,
      companyPosition: String,
      profilePhoto: String,
      challengePhoto: String
    }
  ]
});
