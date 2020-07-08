import * as mongoose from "mongoose";
import { UserSchema } from '../user/schemas/user.schema';

export const CompanySchema = new mongoose.Schema({
  id: String,
  name: String,
  phoneNumber: String,
  domainName: String,
  address: {
    value: String,
    lat: Number,
    lng: Number
  },
  employees: String,
  status: String,
  workplaces: [ String ],
  departments: [
    {
      name: String,
      points: Number
    }
  ],
  users: [
    UserSchema
  ]
});
