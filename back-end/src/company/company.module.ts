import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanySchema } from './schemas/company.schema';
import { UsersModule } from 'src/users/users.module';
import { PoiModule } from 'src/poi/poi.module';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
      UsersModule,
      PoiModule
    ],
    controllers: [CompanyController],
    providers: [CompanyService],
    exports: [CompanyService]
  })
export class CompanyModule {}
