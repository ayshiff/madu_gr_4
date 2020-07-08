import { ApiProperty } from '@nestjs/swagger';

export class Participant {
  @ApiProperty()
  id: string;
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  companyPosition: string;
  @ApiProperty()
  profilePhoto: string;
  @ApiProperty()
  challengePhoto: string;
}
