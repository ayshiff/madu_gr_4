import * as mongoose from 'mongoose';

export const AdviceSchema = new mongoose.Schema({
  id: String,
  title: String,
  content: String,
  category: String,
  photo: String
});
