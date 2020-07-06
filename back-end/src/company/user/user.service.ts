import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { UserRole } from 'src/auth/userRole.enum';
import * as uuidv4 from 'uuid/v4';
import { hashSync } from 'bcrypt';
import { ForgottenPasswordDto } from './dto/forgotten-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Challenge } from 'src/challenge/interfaces/challenge.interface';
import { Poi } from 'src/poi/interfaces/poi.interface';
import { Points } from './model/points.enum';
import { Company } from '../interfaces/company.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel('Company') private readonly companyModel: Model<Company>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    company_id: string = null
  ): Promise<User> {
    const createUser = {
      ...createUserDto,
      id: uuidv4(),
      points: 0,
      visits: [],
      challenges: [],
      roles: [UserRole.User]
    }
    if (createUser.password) {
      createUser.password = await hashSync(
        createUser.password,
        parseInt(this.configService.get<string>('SALT_ROUNDS'))
      );
    }
    console.log(
      `Send mail to ${createUser.email}: account created`
    );
    this.companyModel.updateOne({ id: company_id }, createUser);
    return this.findByUuid(createUser.id);
  }

  async findAllByCompany(company_id: string) {
    const company = await this.companyModel
      .findOne({ id: company_id }, { users: 1 })
      .exec();
    return company.users;
  }

  async findColleague(user: User) {
    const company = await this.companyModel
      .findOne({ 'users.id': user.id }, { users: 1 })
      .exec();
    return company.users;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOneUserBy({ email });
  }

  async update(user: User, createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password) {
      createUserDto.password = await hashSync(
        createUserDto.password,
        parseInt(this.configService.get<string>('SALT_ROUNDS'))
      );
    }
    await this.UpdateOneUserBy(user.id, createUserDto);
    return this.findByUuid(user.id);
  }

  async delete(user: User): Promise<Company> {
    return this.companyModel.updateOne({ 'users.id': user.id }, { $pull: { 'users.id': user.id } });
  }

  async findByUuid(uuid: string) {
    const user = await this.findOneUserBy({ id: uuid });
    if (user === null) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  prefixObjectKeys(prefix: string, object: any) {
    return Object.keys(object).reduce((acc, key) => ({ ...acc, ...{ [`${prefix}${key}`]: object[key] }}), {});
  }

  async findOneUserBy(fields: any): Promise<User | null> {
    const company = await this.companyModel.findOne(
      this.prefixObjectKeys('users.', fields),
      { users: { $elemMatch: fields }}
    ).exec();
    return !company || !Array.isArray(company.users) || !company.users.length ? null : company.users[0];
  }

  async UpdateOneUserBy(id: string, fields: any): Promise<User> {
    return await this.companyModel.updateOne(
      { 'users.id': id },
      { $set: this.prefixObjectKeys('users.$.', fields) }
    );
  }

  async checkForgottenTokenValidity(token: string) {
    const user = await this.findOneUserBy({ forgottenToken: token });
    if (!user) {
      return false;
    }
    const delay = parseInt(this.configService.get<string>('FORGOTTEN_TOKEN_TIME'));
    if (user.forgottenTokenTime + delay - Date.now() < 0) {
      await this.UpdateOneUserBy(user.id, { forgottenToken: null, forgottenTokenTime: null });
      return false;
    }
    return user;
  }

  async forgottenPassword(forgottenPasswordDto: ForgottenPasswordDto) {
    const user = await this.findByEmail(forgottenPasswordDto.email);
    if (user) {
      const forgottenToken = uuidv4().replace(/-/gi, '');
      console.log(
        `Send mail to ${user.email}: follow this link to reset your password ${this.configService.get<string>('FRONT_URL')}/reset-password/${forgottenToken}`
      );
      await this.UpdateOneUserBy(user.id, { forgottenToken: null, forgottenTokenTime: Date.now() });
    }
    return 'An email has been sent to your account';
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.checkForgottenTokenValidity(resetPasswordDto.token);
    if (!user) {
      throw new NotFoundException('Token not found');
    }
    const password = await hashSync(
      resetPasswordDto.password,
      parseInt(this.configService.get<string>('SALT_ROUNDS'))
    );
    console.log(`Send mail to ${user.email}: Your password has been edited`);
    await this.UpdateOneUserBy(user.id, { password, forgottenToken: null, forgottenTokenTime: null });
    return 'Your password has been edited';
  }

  async validateChallenge(challenge: Challenge, user: User) {
    user.challenges.push({
      id: challenge.id,
      title: challenge.title,
      category: challenge.category,
      date: new Date().toISOString(),
      photo: challenge.photo,
      points: challenge.points
    });
    await this.UpdateOneUserBy(user.id, { points: user.points + challenge.points , challenges: user.challenges });
    return this.findByUuid(user.id);
  }

  async visitPoi(poi: Poi, user: User): Promise<User> {
    const index = user.visits.findIndex(visit => visit.id === poi.id);
    if (index >= 0) {
      user.visits[index].number++;
    } else {
      user.visits.push({
        id: poi.id,
        name: poi.name,
        category: poi.category,
        description: poi.description,
        number: 1,
      });
    }
    await this.UpdateOneUserBy(user.id, { points: user.points + Points.Poi , visits: user.visits });
    return this.findByUuid(user.id);
  }

  async addImage(user: User, image: any): Promise<User> {
    let points = user.points;
    if (user.photo === undefined) {
      points += Points.Profil;
    }
    await this.UpdateOneUserBy(user.id, { points, photo: image ? image.filename : null });
    return this.findByUuid(user.id);
  }
}
