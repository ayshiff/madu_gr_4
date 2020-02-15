import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CompanyModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PoiModule } from './poi/poi.module';
import { GreenscoreModule } from './greenscore/greenscore.module';

// todo poi answer, poi update, return value on post, status poi, status company, deal with outside applications(no auth),
// deal with _id in view, forgotten password, localisation, mail
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/madu'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CompanyModule,
    AuthModule,
    UsersModule,
    PoiModule,
    GreenscoreModule
  ],
  controllers: [AppController]
})
export class AppModule {}
