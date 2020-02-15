import * as mongoose from 'mongoose';

export const CompanySchema = new mongoose.Schema({
  id: String,
  name: String,
  domainName: String,
  street: String,
  zipCode: Number,
  city: String,
  status: String
});