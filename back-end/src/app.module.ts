import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { CompanyModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

// todo bcrypt, uuid, serialization (delete _id from view), .env (secret key jwt), nodemon restart
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/madu'), CompanyModule, AuthModule, UsersModule],
  controllers: [AppController]
})
export class AppModule {}
