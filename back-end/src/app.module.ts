import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CompanyModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PoiModule } from './poi/poi.module';
import { GreenscoreModule } from './greenscore/greenscore.module';

// todo dump db, tests
// user all routes + edit route poi + 1 route with select template and create token to send to client
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
