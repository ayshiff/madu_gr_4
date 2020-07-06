import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { CompanyModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';
import { PoiModule } from './poi/poi.module';
import { ChallengeModule } from './challenge/challenge.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register({
      dest: '/upload',
    }),    
    CompanyModule,
    AuthModule,
    PoiModule,
    ChallengeModule
  ],
  controllers: [AppController]
})
export class AppModule {}
