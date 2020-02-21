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
  UsePipes,
  UnauthorizedException,
  NotFoundException
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./interfaces/user.interface";
import { UserRole } from "src/auth/userRole.enum";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { Roles } from "src/auth/decorator/roles.decorator";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { CustomValidationPipe } from "./pipes/CustomValidationPipe";
import { ForgottenPasswordDto } from "./dto/forgotten-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { Token } from "src/auth/interfaces/token.interface";

@ApiTags("User")
@Controller("users")
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/admin")
  @UsePipes(CustomValidationPipe)
  async create(@Request() req, @Body() createAdminDto: CreateAdminDto) {
    if (!(await this.usersService.accessOnlyOnceOrAdmin(req.user))) {
      throw new UnauthorizedException();
    }
    return this.usersService.createAdmin(createAdminDto);
  }

  @Put("/password/forgotten")
  async forgottenPassword(@Body() forgottenPasswordDto: ForgottenPasswordDto) {
    return this.usersService.forgottenPassword(forgottenPasswordDto);
  }

  @Get("/password/:token")
  @ApiResponse({ type: Token })
  async checkResetToken(@Param("token") token: string) {
    const user = await this.usersService.checkForgottenTokenValidity(token);
    if (!user) {
      throw new NotFoundException("Token not found");
    }
    return { token };
  }

  @Put("/password/reset")
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.usersService.resetPassword(resetPasswordDto);
  }

  @Get()
  @Roles(UserRole.Admin)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get("profile")
  @Roles(UserRole.User)
  @ApiResponse({ type: User })
  getProfile(@Request() req) {
    return req.user;
  }

  @Get(":user_id")
  @Roles(UserRole.Manager)
  async findOne(@Request() req, @Param("user_id") id: string): Promise<User> {
    const user = await this.usersService.findByUuid(id);
    this.usersService.denyAccessByCompany(req.user, user);
    return user;
  }

  @Put(":user_id")
  @Roles(UserRole.Manager)
  async update(
    @Request() req,
    @Param("user_id") id: string,
    @Body() createUserDto: CreateUserDto
  ) {
    const user = await this.usersService.findByUuid(id);
    this.usersService.denyAccessByCompany(req.user, user);
    return this.usersService.update(user, createUserDto);
  }

  @Delete(":user_id")
  @Roles(UserRole.Manager)
  async remove(@Request() req, @Param("user_id") id: string) {
    const user = await this.usersService.findByUuid(id);
    this.usersService.denyAccessByCompany(req.user, user);
    this.usersService.delete(user);
  }
}
