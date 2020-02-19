import * as mongoose from 'mongoose';

export const TemplateSchema = new mongoose.Schema({
  id: String,
  name: String,
  questions:[
    {
      id: String,
      question: String,
      questionType: String,
      answers: [
        {
          id: String,
          answer: String,
          score: Number
        }
      ]
    }
  ]
});