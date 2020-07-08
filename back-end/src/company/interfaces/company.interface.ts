import { ApiProperty } from '@nestjs/swagger';
import { Department } from './department.interface';
import { User } from '../user/interfaces/user.interface';

export class Company {
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  domainName: string;
  @ApiProperty()
  phoneNumber: string;
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
  @ApiProperty()
  users: User[];
}
