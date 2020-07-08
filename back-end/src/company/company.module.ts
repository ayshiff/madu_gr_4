import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanySchema } from './schemas/company.schema';
import { PoiModule } from 'src/poi/poi.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
      forwardRef(() => PoiModule),
      forwardRef(() => UserModule)
    ],
    controllers: [CompanyController],
    providers: [CompanyService],
    exports: [CompanyService, UserModule, MongooseModule]
  })
export class CompanyModule {}
