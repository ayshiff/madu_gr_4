import * as mongoose from 'mongoose';

export interface Company {
  _id: mongoose.Schema.Types.ObjectId;
  id: string;
  name: string;
  domainName: string;
  address: {
    value: string,
    lat: number,
    lng: number
  };
  employees: string;
  status: string;
}