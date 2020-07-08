import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  constructor(
    private readonly userService: UserService
  ) {}

  async transform(value: CreateUserDto) {
    if (await this.userService.findByEmail(value.email) !== null) {
      throw new BadRequestException('Email already used');
    }
    
    return value
  }
}