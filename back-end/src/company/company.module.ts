import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanySchema } from './schemas/company.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
      MongooseModule.forFeatureAsync([
        {
          name: 'Company',
          useFactory: () => {
            const schema = CompanySchema;
            schema.pre(/^find/, function(next) {
              this.select({ _id: 0, __v: 0 });
              next();
            });
            return schema;
          },
        },
      ]),
      UsersModule
    ],
    controllers: [CompanyController],
    providers: [CompanyService],
    exports: [CompanyService]
  })
export class CompanyModule {}
