import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  constructor(
    private readonly usersService: UsersService
  ) {}

  async transform(value: CreateUserDto) {
    if (await this.usersService.findByEmail(value.email) !== null) {
      throw new BadRequestException('Email already used');
    }
    
    return value
  }
}