import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { CustomValidationPipe } from './pipes/CustomValidationPipe';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  providers: [UsersService, CustomValidationPipe],
  controllers: [UserController],
  exports: [UsersService, CustomValidationPipe]
})
export class UsersModule {}
