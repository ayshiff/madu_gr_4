import * as mongoose from 'mongoose';

export const TemplateSchema = new mongoose.Schema({
  id: String,
  name: String,
  questions:[
    {
      question: String,
      questionType: String,
      answers: [
        {
          answer: String,
          score: Number
        }
      ]
    }
  ]
});