import { Controller, Get, Request, UseGuards, Body, Post, Put, Delete, Param, UsePipes, UnauthorizedException } from '@nestjs/common';
import { UsersService } from "./users.service";
import { User } from './interfaces/user.interface';
import { UserRole } from 'src/auth/userRole.enum';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CustomValidationPipe } from './pipes/CustomValidationPipe';

@ApiTags('User')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/admin')
  @UsePipes(CustomValidationPipe)
  async create(@Request() req, @Body() createAdminDto: CreateAdminDto) {
    if (!await this.usersService.accessOnlyOnceOrAdmin(req.user)) {
      throw new UnauthorizedException();
    }
    this.usersService.createAdmin(createAdminDto);
  }

  @Get()
  @Roles(UserRole.Admin)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('profile')
  @Roles(UserRole.User)
  getProfile(@Request() req) {
    return req.user;
  }

  @Get(':user_id')
  @Roles(UserRole.Manager)
  async findOne(@Request() req, @Param('user_id') id: string): Promise<User> {
    const user = await this.usersService.findByUuid(id);
    // this.usersService.denyAccessByCompany(req.user, user);
    return user;
  }

  @Put(':user_id')
  @Roles(UserRole.Manager)
  async update(@Request() req, @Param('user_id') id: string, @Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findByUuid(id);
    // this.usersService.denyAccessByCompany(req.user, user);
    this.usersService.update(user, createUserDto);
  }

  @Delete(':user_id')
  @Roles(UserRole.Manager)
  async remove(@Request() req, @Param('user_id') id: string) {
    const user = await this.usersService.findByUuid(id);
    // this.usersService.denyAccessByCompany(req.user, user);
    this.usersService.delete(user);
  }
}
