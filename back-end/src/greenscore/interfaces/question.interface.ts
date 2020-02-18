import * as mongoose from 'mongoose';

export interface Question {
  _id: mongoose.Schema.Types.ObjectId;
  id: string;
  question: string;
  questionType: string;
  answers: [
    {
      answer: string,
      score: number
    }
  ];
}