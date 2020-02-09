import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './interfaces/question.interface';
import { CreateQuestionDto } from './dto/create-question.dto';
import * as uuidv4 from 'uuid/v4';

@Injectable()
export class QuestionService {
  constructor(@InjectModel('Question') private readonly questionModel: Model<Question>) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    let createdQuestion = new this.questionModel(createQuestionDto);
    createdQuestion.id = uuidv4();
    return createdQuestion.save();
  }

  async update(question: Question, createQuestionDto: CreateQuestionDto): Promise<Question> {
    return this.questionModel.updateOne(question, createQuestionDto);
  }

  async delete(question: Question): Promise<Question> {
    return this.questionModel.deleteOne(question);
  }

  async findAll(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }

  async findByUuid(uuid: string): Promise<Question> {
    const question = await this.questionModel.findOne({id: uuid});
    if (question === null) {
      throw new NotFoundException('Question not found');
    }
    return question;
  }
}
