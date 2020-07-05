import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';
import { ChallengeSchema } from './schemas/challenge.schema';
import { CompanyModule } from 'src/company/company.module';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'Challenge', schema: ChallengeSchema }]),
      CompanyModule
    ],
    controllers: [ChallengeController],
    providers: [ChallengeService],
    exports: [ChallengeService]
  })
export class ChallengeModule {}
