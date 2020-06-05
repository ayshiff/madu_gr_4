import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Advice } from './interfaces/advice.interface';
import { AdviceDto } from './dto/advice.dto';
import * as uuidv4 from 'uuid/v4';

@Injectable()
export class AdviceService {
  constructor(
    @InjectModel("Advice") private readonly adviceModel: Model<Advice>
  ) {}

  async create(adviceDto: AdviceDto): Promise<Advice> {
    let createdAdvice = new this.adviceModel(adviceDto);
    createdAdvice.id = uuidv4();
    await createdAdvice.save();
    return this.findByUuid(createdAdvice.id);
  }

  async update(
    advice: Advice,
    adviceDto: AdviceDto
  ): Promise<Advice> {
    await this.adviceModel.updateOne({ id: advice.id }, adviceDto);
    return this.findByUuid(advice.id);
  }

  async delete(advice: Advice): Promise<Advice> {
    return this.adviceModel.deleteOne(advice);
  }

  async findAll(): Promise<Advice[]> {
    return this.adviceModel.find().exec();
  }

  async findByUuid(uuid: string): Promise<Advice> {
    const advice = await this.adviceModel.findOne({ id: uuid });
    if (advice === null) {
      throw new NotFoundException("Advice not found");
    }
    return advice;
  }
}
