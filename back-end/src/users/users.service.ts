import { Model } from "mongoose";
import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./interfaces/user.interface";
import { InjectModel } from "@nestjs/mongoose";
import { UserRole } from "src/auth/userRole.enum";
import * as uuidv4 from "uuid/v4";
import { hashSync } from "bcrypt";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { ForgottenPasswordDto } from "./dto/forgotten-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel("User") private readonly userModel: Model<User>
  ) {}

  async create(
    createUserDto: CreateUserDto,
    company_id: string = null
  ): Promise<User> {
    let createdUser = new this.userModel(createUserDto);
    createdUser.id = uuidv4();
    createdUser.company_id = company_id;
    createdUser.roles = [UserRole.User];
    if (createUserDto.manager) {
      createdUser.roles.push(UserRole.Manager);
    }
    createdUser.password = "not_set_yet";
    console.log(
      `Send mail to ${createdUser.email}: account created, you can use the forgot password functionality to create a password`
    );
    await createdUser.save();
    return this.findByUuid(createdUser.id);
  }

  async accessOnlyOnceOrAdmin(user?: User) {
    return (
      (user && user.roles.includes(UserRole.Admin)) ||
      (await this.findAllAdmin()).length === 0
    );
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<User> {
    let createdUser = new this.userModel(createAdminDto);
    createdUser.id = uuidv4();
    createdUser.roles = [UserRole.User, UserRole.Manager, UserRole.Admin];
    if (createdUser.password) {
      createdUser.password = await hashSync(
        createdUser.password,
        parseInt(this.configService.get<string>("SALT_ROUNDS"))
      );
    }
    await createdUser.save();
    return this.findByUuid(createdUser.id);
  }

  async findAllAdmin(): Promise<User[]> {
    return this.userModel
      .find({ roles: UserRole.Admin }, { password: 0 })
      .exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({}, { password: 0 }).exec();
  }

  async findAllByCompany(company_id: string): Promise<User[]> {
    return this.userModel
      .find({ company_id: company_id }, { password: 0, company_id: 0 })
      .exec();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email: email });
  }

  async update(user: User, createUserDto: CreateUserDto): Promise<User> {
    createUserDto.manager = null;
    await this.userModel.updateOne(user, createUserDto);
    return this.findByUuid(user.id);
  }

  async delete(user: User): Promise<User> {
    return this.userModel.deleteOne({ id: user.id });
  }

  async deleteAllByCompany(company_id: string) {
    const users = await this.findAllByCompany(company_id);
    users.map(user => this.delete(user));
  }

  async findByUuid(uuid: string): Promise<User> {
    const user = await this.userModel.findOne({ id: uuid });
    if (user === null) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async checkForgottenTokenValidity(token: string) {
    const user = await this.userModel.findOne({ forgottenToken: token });
    if (!user) {
      return false;
    }
    if (
      user.forgottenTokenTime +
        parseInt(this.configService.get<string>("FORGOTTEN_TOKEN_TIME")) -
        Date.now() <
      0
    ) {
      await this.userModel.updateOne(
        { id: user.id },
        { forgottenToken: null, forgottenTokenTime: null }
      );
      return false;
    }
    return user;
  }

  async forgottenPassword(forgottenPasswordDto: ForgottenPasswordDto) {
    const user = await this.findByEmail(forgottenPasswordDto.email);
    if (user) {
      const forgottenToken = uuidv4().replace(/-/gi, "");
      console.log(
        `Send mail to ${
          user.email
        }: follow this link to reset your password ${this.configService.get<
          string
        >("FRONT_URL")}/reset-password/${forgottenToken}`
      );
      await this.userModel.updateOne(
        { id: user.id },
        { forgottenToken, forgottenTokenTime: Date.now() }
      );
    }
    return "An email has been sent to your account";
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.checkForgottenTokenValidity(resetPasswordDto.token);
    if (!user) {
      throw new NotFoundException("Token not found");
    }
    const password = await hashSync(
      resetPasswordDto.password,
      parseInt(this.configService.get<string>("SALT_ROUNDS"))
    );
    console.log(`Send mail to ${user.email}: Your password has been edited`);
    await this.userModel.updateOne(
      { id: user.id },
      { password, forgottenToken: null, forgottenTokenTime: null }
    );
    return "Your password has been edited";
  }

  denyAccessByCompany(user: User, resource: User) {
    if (
      !user.roles.includes(UserRole.Admin) &&
      resource.company_id + "" !== user.company_id + ""
    ) {
      throw new UnauthorizedException();
    }
  }
}
