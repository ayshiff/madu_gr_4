import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Poi } from './interfaces/poi.interface';
import { CreatePoiDto } from './dto/create-poi.dto';
import * as uuidv4 from 'uuid/v4';
import { TemplateService } from 'src/greenscore/template.service';
import { CreatePoiGreenscoreDto } from './dto/create-poi-greenscore.dto';
import { AnswerPoiGreenscoreDto } from './dto/answer-poi-greenscore.dto';
import { UpdatePoiDto } from './dto/update-poi.dto';

@Injectable()
export class PoiService {
  constructor(
    @InjectModel('Poi') private readonly poiModel: Model<Poi>,
    private readonly templateService: TemplateService
  ) {}

  async create(createPoiDto: CreatePoiDto): Promise<Poi> {
    let createdPoi = new this.poiModel(createPoiDto);
    createdPoi.id = uuidv4();
    await createdPoi.save();
    return this.findByUuid(createdPoi.id);
  }

  async update(poi: Poi, updatePoiDto: UpdatePoiDto): Promise<Poi> {
    await this.poiModel.updateOne(poi, updatePoiDto);
    return this.findByUuid(poi.id);
  }

  async delete(poi: Poi) {
    return this.poiModel.deleteOne(poi);
  }

  async findAll(): Promise<Poi[]> {
    return this.poiModel.find().exec();
  }

  async findByUuid(uuid: string): Promise<Poi> {
    const poi = await this.poiModel.findOne({id: uuid});
    if (poi === null) {
      throw new NotFoundException('Poi not found');
    }
    return poi;
  }

  async surveySend(poi: Poi, createPoiGreenscoreDto: CreatePoiGreenscoreDto) {
    const template = await this.templateService.findByUuid(createPoiGreenscoreDto.template);
    if (!template) {
      throw new BadRequestException('Invalid template')
    }
    const { id, name } = template;
    const token = createPoiGreenscoreDto.sendToPoi ? uuidv4().replace(/-/gi, '') : null;
    await this.poiModel.updateOne({ id: poi.id }, { template: { id, name }, token });
    return this.findByUuid(poi.id);
  }

  async surveyAnswer(poi: Poi, answerPoiGreenscoreDto: AnswerPoiGreenscoreDto) {
    const template = await this.templateService.findByUuid(poi.template.id);
    const questions = template.questions.map(question => {
      for (let i = 0; i < answerPoiGreenscoreDto.questions.length; i++) {
        const received = answerPoiGreenscoreDto.questions[i];
        if (received.questin_id === question.id) {
          for (let j = 0; j < question.answers.length; j++) {
            const answer = question.answers[j];
            if (received.answer_id === answer.id) {
              return {
                id: question.id,
                question: question.question,
                answer: answer.answer,
                score: answer.score
              };
            }
          }
        }
      }
      return {
        id: question.id,
        question: question.question,
        answer: null,
        score: null
      };
    });
    const { id, name } = template;
    await this.poiModel.updateOne({ id: poi.id }, { template: { id, name, questions } });
    return this.findByUuid(poi.id);
  }
}
