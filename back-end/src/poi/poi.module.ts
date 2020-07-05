import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PoiService } from './poi.service';
import { PoiController } from './poi.controller';
import { PoiSchema } from "./schemas/poi.schema";
import { GreenscoreModule } from 'src/greenscore/greenscore.module';
import { CompanyModule } from 'src/company/company.module';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'Poi', schema: PoiSchema }]),
      GreenscoreModule,
      forwardRef(() => CompanyModule)
    ],
    providers: [PoiService],
    controllers: [PoiController],
    exports: [PoiService]
  })
export class PoiModule {}
