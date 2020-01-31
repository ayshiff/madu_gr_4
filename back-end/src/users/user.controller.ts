import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from "./users.service";
import { User } from './interfaces/user.interface';
// import { Roles } from 'src/auth/decorator/roles.decorator';
// import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
// @UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // @Roles('admin')
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('profile')
  // @Roles('user')
  getProfile(@Request() req) {
    return req.user;
  }
}
