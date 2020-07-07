import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CustomValidationPipe } from './pipes/CustomValidationPipe';
import { CompanyModule } from '../company.module';

@Module({
    imports: [
      forwardRef(() => CompanyModule)
    ],
    controllers: [UserController],
    providers: [UserService, CustomValidationPipe],
    exports: [UserService, CustomValidationPipe]
  })
export class UserModule {}
