import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';
import { ChallengeSchema } from './schemas/challenge.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'Challenge', schema: ChallengeSchema }]),
      UsersModule
    ],
    controllers: [ChallengeController],
    providers: [ChallengeService],
    exports: [ChallengeService]
  })
export class ChallengeModule {}
