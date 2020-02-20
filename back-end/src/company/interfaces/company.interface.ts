import * as mongoose from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class Company {
  _id: mongoose.Schema.Types.ObjectId;
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  companyName: string;
  @ApiProperty()
  domainName: string;
  @ApiProperty()
  address: {
    value: string;
    lat: number;
    lng: number;
  };
  @ApiProperty()
  employees: string;
  @ApiProperty()
  status: string;
}
