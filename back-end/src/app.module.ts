import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CompanyModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PoiModule } from './poi/poi.module';

// todo dump db, tests
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/madu'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CompanyModule,
    AuthModule,
    UsersModule,
    PoiModule
  ],
  controllers: [AppController]
})
export class AppModule {}
