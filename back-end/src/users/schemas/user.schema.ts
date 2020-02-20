import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: String,
  email: String,
  firstname: String,
  lastname: String,
  password: String,
  roles: [
    String
  ],
  company_id: String,
  companyPosition: String,
  forgottenToken: String,
  forgottenTokenTime: Number,
});