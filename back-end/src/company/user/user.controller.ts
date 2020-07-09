import {
  Controller,
  Get,
  Request,
  UseGuards,
  Body,
  Post,
  Put,
  Delete,
  Param,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
  Req
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { UserRole } from 'src/auth/userRole.enum';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { ForgottenPasswordDto } from './dto/forgotten-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Token } from 'src/auth/interfaces/token.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter, editFileName } from "src/shared/interceptor/multer.interceptor";
import { RequestUser } from 'src/shared/decorator/user.decorator';

@ApiTags('User')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post('/password/forgotten')
  async forgottenPassword(@Body() forgottenPasswordDto: ForgottenPasswordDto) {
    return this.userService.forgottenPassword(forgottenPasswordDto);
  }

  @Get('/password/:token')
  @ApiResponse({ type: Token })
  async checkResetToken(@Param('token') token: string) {
    const user = await this.userService.checkForgottenTokenValidity(token);
    if (!user) {
      throw new NotFoundException('Token not found');
    }
    return { token };
  }

  @Post('/password/reset')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.userService.resetPassword(resetPasswordDto);
  }

  @Get('profile')
  @Roles(UserRole.User)
  @ApiResponse({ type: User })
  getProfile(@RequestUser() user) {
    return user;
  }

  @Put('profile')
  @Roles(UserRole.User)
  async updateProfile(
    @RequestUser() user,
    @Body() createUserDto: CreateUserDto
  ) {
    return this.userService.update(user, createUserDto);
  }

  @Post('image')
  @Roles(UserRole.User)
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './upload',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }))
  async validate(@UploadedFile() image, @RequestUser() user) {
    return this.userService.addImage(user, image);
  }

  @Get(':user_id')
  @Roles(UserRole.User)
  async findOne(@Request() req, @Param('user_id') id: string): Promise<User> {
    const user = await this.userService.findByUuid(id);
    this.userService.denyAccessByCompany(req.user, user);
    return user;
  }

  @Put(':user_id')
  @Roles(UserRole.Admin)
  async update(
    @Param('user_id') id: string,
    @Body() createUserDto: CreateUserDto
  ) {
    const user = await this.userService.findByUuid(id);
    return this.userService.update(user, createUserDto);
  }

  @Delete(':user_id')
  @Roles(UserRole.Admin)
  async remove(@Request() req, @Param('user_id') id: string) {
    const user = await this.userService.findByUuid(id);
    this.userService.delete(user);
  }
}
