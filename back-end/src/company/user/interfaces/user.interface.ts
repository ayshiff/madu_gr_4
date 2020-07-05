import { ApiProperty } from '@nestjs/swagger';
import { Challenge } from './challenge.interface';
import { Visit } from './visit.interface';

export class User {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  lastname: string;
  password: string;
  @ApiProperty()
  roles: [string];
  @ApiProperty()
  workplace: string;
  @ApiProperty()
  department: string;
  @ApiProperty()
  points: number;
  companyPosition: string;
  forgottenToken?: string;
  forgottenTokenTime?: number;
  @ApiProperty()
  photo: string;
  @ApiProperty()
  challenges: Challenge[]
  @ApiProperty()
  visits: Visit[]
}