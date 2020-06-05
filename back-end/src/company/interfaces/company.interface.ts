import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Department } from './department.interface';

export class Company {
  _id: mongoose.Schema.Types.ObjectId;
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
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
  @ApiProperty()
  workplaces: string[];
  @ApiProperty()
  departments: Department[];
}
