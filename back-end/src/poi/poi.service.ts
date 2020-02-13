import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Poi } from './interfaces/poi.interface';
import { CreatePoiDto } from './dto/create-poi.dto';
import * as uuidv4 from 'uuid/v4';
import { TemplateService } from 'src/greenscore/template.service';
import { CreatePoiGreenscoreDto } from './dto/create-poi-greenscore.dto';
import { AnswerPoiGreenscoreDto } from './dto/answer-poi-greenscore.dto';

@Injectable()
export class PoiService {
  constructor(
    @InjectModel('Poi') private readonly poiModel: Model<Poi>,
    private readonly templateService: TemplateService
  ) {}

  async create(createPoiDto: CreatePoiDto): Promise<Poi> {
    let createdPoi = new this.poiModel(createPoiDto);
    createdPoi.id = uuidv4();
    return createdPoi.save();
  }

  async update(poi: Poi, createPoiDto: CreatePoiDto): Promise<Poi> {
    return this.poiModel.updateOne(poi, createPoiDto);
  }

  async delete(poi: Poi): Promise<Poi> {
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
  }

  async surveyAnswer(poi: Poi, answerPoiGreenscoreDto: AnswerPoiGreenscoreDto) {
    const template = await this.templateService.findByUuid(poi.template.id);
    const questions = template.questions.map(question => {
      // check answerPoiGreenscoreDto.questions[i].question_id === question.id && answerPoiGreenscoreDto.questions[i].answer_id === question.answers[j].id
      // return {question_id, answer_id, score};
    });
    console.log(template);
    console.log(answerPoiGreenscoreDto);
    // await this.poiModel.updateOne({ id: poi.id }, { template: { questions: {  } } });
  }
}
