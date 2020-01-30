import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');


@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel('User') private readonly userModel: Model<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let createdUser = new this.userModel(createUserDto);
    createdUser.id = uuidv4();
    createdUser.password = await bcrypt.hashSync(
      createdUser.password,
      parseInt(this.configService.get<string>('SALT_ROUNDS'))
    );
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({}, {password: 0}).exec();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({email: email});
  }
}