import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from "./users.service";
import { User } from './interfaces/user.interface';
import { UserRole } from 'src/auth/userRole.enum';
import { ApiTags } from '@nestjs/swagger';
// import { Roles } from 'src/auth/decorator/roles.decorator';
// import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('User')
@Controller('users')
// @UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // @Roles(UserRole.Admin)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('profile')
  // @Roles(UserRole.User)
  getProfile(@Request() req) {
    return req.user;
  }
}
