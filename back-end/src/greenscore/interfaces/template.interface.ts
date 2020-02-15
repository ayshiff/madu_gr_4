import * as mongoose from 'mongoose';

export interface Template {
  _id: mongoose.Schema.Types.ObjectId;
  id: string;
  name: String;
  questions:[
    {
      id: string,
      question: string,
      type: string,
      answers: [
        {
          id: string,
          answer: string,
          score: number
        }
      ]
    }
  ];
}