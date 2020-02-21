import * as mongoose from "mongoose";

export const CompanySchema = new mongoose.Schema({
  id: String,
  name: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  companyName: String,
  domainName: String,
  address: {
    value: String,
    lat: Number,
    lng: Number
  },
  employees: String,
  status: String
});
