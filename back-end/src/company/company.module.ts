import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanySchema } from './schemas/company.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
      UsersModule
    ],
    controllers: [CompanyController],
    providers: [CompanyService],
    exports: [CompanyService]
  })
export class CompanyModule {}
