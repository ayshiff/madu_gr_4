import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { UserRole } from 'src/auth/userRole.enum';
import * as uuidv4 from 'uuid/v4';
import { hashSync } from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel('User') private readonly userModel: Model<User>
  ) {}

  async create(createUserDto: CreateUserDto, company_id: string): Promise<User> {
    let createdUser = new this.userModel(createUserDto);
    createdUser.id = uuidv4();
    createdUser.company_id = company_id;
    createdUser.roles = [UserRole.User];
    if (createUserDto.manager) {
      createdUser.roles.push(UserRole.Manager);
    }
    if (createdUser.password) {
      createdUser.password = await hashSync(
        createdUser.password,
        parseInt(this.configService.get<string>('SALT_ROUNDS'))
      );
    }
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({}, {password: 0}).exec();
  }

  async findAllByCompany(company_id: string): Promise<User[]> {
    return this.userModel.find({company_id: company_id}, {password: 0, company_id: 0}).exec();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({email: email});
  }
}