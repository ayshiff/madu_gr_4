import * as mongoose from 'mongoose';

export const QuestionSchema = new mongoose.Schema({
  id: String,
  question: String,
  questionType: String,
  answers: [
    {
      answer: String,
      score: Number
    }
  ]
});