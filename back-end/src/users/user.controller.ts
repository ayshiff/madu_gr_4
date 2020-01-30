import { Controller, Post, Body, Get, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { User } from './interfaces/user.interface';
import { CustomValidationPipe } from './pipes/CustomEmailValidationPipe';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(CustomValidationPipe)
  async create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
