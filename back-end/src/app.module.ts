import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CompanyModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

// todo serialization (delete _id from view)
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/madu'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CompanyModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController]
})
export class AppModule {}
