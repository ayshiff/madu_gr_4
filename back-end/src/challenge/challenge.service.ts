import { Model } from 'mongoose';
import { Injectable, NotFoundException, Inject, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Challenge } from './interfaces/challenge.interface';
import { ChallengeDto } from './dto/challenge.dto';
import * as uuidv4 from 'uuid/v4';
import { UserService } from 'src/company/user/user.service';
import { User } from 'src/company/user/interfaces/user.interface';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class ChallengeService {
  constructor(
    @InjectModel("Challenge") private readonly challengeModel: Model<Challenge>,
    private readonly userService: UserService,
    @Inject(REQUEST) private request: any
  ) {}

  async create(challengeDto: ChallengeDto): Promise<Challenge> {
    let challenge = new this.challengeModel(challengeDto);
    challenge.id = uuidv4();
    await challenge.save();
    return this.findByUuid(challenge.id);
  }

  async update(
    challenge: Challenge,
    updateCompanyDto: ChallengeDto
  ): Promise<Challenge> {
    await this.challengeModel.updateOne({ id: challenge.id }, updateCompanyDto);
    return this.findByUuid(challenge.id);
  }

  async validate(challenge: Challenge, user: User, image: any): Promise<Challenge> {
    if (challenge.participants.findIndex(item => item.id === user.id) === -1) {
      challenge.participants.push({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        companyPosition: user.companyPosition,
        profilePhoto: user.photo || null,
        challengePhoto: image ? image.filename : null
      });
      await this.challengeModel.updateOne({ id: challenge.id }, { participants: challenge.participants });
      await this.userService.validateChallenge(challenge, user);
    }
    return this.findByUuid(challenge.id);
  }

  async delete(company: Challenge): Promise<Challenge> {
    return this.challengeModel.deleteOne(company);
  }

  async filterParticipantsByColleagues(challenge: Challenge): Promise<Challenge> {
    const userToDisplay = await this.userService.findColleague(this.request.user);
    challenge.participants = challenge.participants.filter(
      participant => userToDisplay.map(user => user.id).includes(participant.id)
    );
    return challenge;
  }

  async findAll(): Promise<Challenge[]> {
    const challenges = await this.challengeModel.find().exec();
    return Promise.all(challenges.map(challenge => this.filterParticipantsByColleagues(challenge)));
  }

  async findByUuid(uuid: string): Promise<Challenge> {
    const challenge = await this.challengeModel.findOne({ id: uuid });
    if (challenge === null) {
      throw new NotFoundException("Challenge not found");
    }
    return this.filterParticipantsByColleagues(challenge);
  }

  async findWeekly(): Promise<Challenge> {
    const challenge = await this.challengeModel.findOne();
    if (challenge === null) {
      throw new NotFoundException("Challenge not found");
    }
    return this.filterParticipantsByColleagues(challenge);
  }
}
