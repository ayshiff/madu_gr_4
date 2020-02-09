import * as mongoose from 'mongoose';

export interface Template {
  _id: mongoose.Schema.Types.ObjectId;
  id: string;
  name: String;
  questions:[
    {
      question: string,
      type: string,
      answers: [
        {
          answer: string,
          score: number
        }
      ]
    }
  ];
}