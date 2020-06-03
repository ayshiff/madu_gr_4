import { ApiProperty } from "@nestjs/swagger";

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
  company_id: string;
  @ApiProperty()
  workplace: string;
  @ApiProperty()
  department: string;
  companyPosition: string;
  forgottenToken?: string;
  forgottenTokenTime?: number;
}