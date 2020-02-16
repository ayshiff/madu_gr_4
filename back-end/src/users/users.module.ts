import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { CustomValidationPipe } from './pipes/CustomValidationPipe';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'User',
        useFactory: () => {
          const schema = UserSchema;
          schema.pre(/^find/, function(next) {
            this.select({ _id: 0, __v: 0 });
            next();
          });
          return schema;
        },
      },
    ])
  ],
  providers: [UsersService, CustomValidationPipe],
  controllers: [UserController],
  exports: [UsersService, CustomValidationPipe]
})
export class UsersModule {}
