import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdviceController } from './advice.controller';
import { AdviceService } from './advice.service';
import { AdviceSchema } from './schemas/advice.schema';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'Advice', schema: AdviceSchema }])
    ],
    controllers: [AdviceController],
    providers: [AdviceService],
    exports: [AdviceService]
  })
export class AdviceModule {}
