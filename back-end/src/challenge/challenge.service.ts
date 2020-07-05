import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Challenge } from './interfaces/challenge.interface';
import { ChallengeDto } from './dto/challenge.dto';
import * as uuidv4 from 'uuid/v4';
import { UserService } from 'src/company/user/user.service';
import { User } from 'src/company/user/interfaces/user.interface';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectModel("Challenge") private readonly challengeModel: Model<Challenge>,
    private readonly userService: UserService
  ) {}

  async create(challengeDto: ChallengeDto): Promise<Challenge> {
    let challenge = new this.challengeModel(challengeDto);
    challenge.id = uuidv4();
    await challenge.save();
    return this.findByUuid(challenge.id);
  }

  async update(
    company: Challenge,
    updateCompanyDto: ChallengeDto
  ): Promise<Challenge> {
    await this.challengeModel.updateOne({ id: company.id }, updateCompanyDto);
    return this.findByUuid(company.id);
  }

  async validate(challenge: Challenge, user: User, image: any): Promise<Challenge> {
    if (challenge.participants.findIndex(item => item.id === user.id) === -1) {
      challenge.participants.push({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        companyPosition: user.companyPosition,
        photo: image ? image.filename : null
      });
      await this.challengeModel.updateOne({ id: challenge.id }, { participants: challenge.participants });
      await this.userService.validateChallenge(challenge, user, image);
    }
    return this.findByUuid(challenge.id);
  }

  async delete(company: Challenge): Promise<Challenge> {
    return this.challengeModel.deleteOne(company);
  }

  async findAll(): Promise<Challenge[]> {
    return this.challengeModel.find().exec();
  }

  async findByUuid(uuid: string): Promise<Challenge> {
    const company = await this.challengeModel.findOne({ id: uuid });
    if (company === null) {
      throw new NotFoundException("Challenge not found");
    }
    return company;
  }
}
