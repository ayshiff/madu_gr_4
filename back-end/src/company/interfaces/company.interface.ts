import * as mongoose from 'mongoose';

export interface Company {
  _id: mongoose.Schema.Types.ObjectId;
  id: string;
  name: string;
}