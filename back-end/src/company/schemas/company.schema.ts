import * as mongoose from 'mongoose';

export const CompanySchema = new mongoose.Schema({
  id: String,
  name: String,
  domainName: String,
  address: {
    value: String,
    lat: Number,
    lng: Number
  },
  status: String
});