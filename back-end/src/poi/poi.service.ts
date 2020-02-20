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
import { PoiStatus } from "./model/poi-status.enum";
import { ValidatePoiGreenscoreDto } from './dto/validate-poi-greenscore.dto';
import { PoiCategories } from './model/poi-categories.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PoiService {
  constructor(
    @InjectModel('Poi') private readonly poiModel: Model<Poi>,
    private readonly templateService: TemplateService,
    private readonly configService: ConfigService
  ) {}

  async create(createPoiDto: CreatePoiDto): Promise<Poi> {
    let createdPoi = new this.poiModel(createPoiDto);
    createdPoi.id = uuidv4();
    createdPoi.status = PoiStatus.Canvassing;
    if (createdPoi.category !== PoiCategories.Restoration) {
      createdPoi.foodPreference = undefined
      createdPoi.takeAway = undefined
    }
    await createdPoi.save();
    return this.findByUuid(createdPoi.id);
  }

  async update(poi: Poi, updatePoiDto: UpdatePoiDto): Promise<Poi> {
    await this.poiModel.updateOne({ id: poi.id }, updatePoiDto);
    return this.findByUuid(poi.id);
  }

  async addImages(poi: Poi, images: Array<string>): Promise<Poi> {
    await this.poiModel.updateOne({ id: poi.id }, { images });
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
    console.log('Send mail : Poi survey sent');
    const { id, name } = template;
    const token = createPoiGreenscoreDto.sendToPoi ? uuidv4().replace(/-/gi, '') : null;
    await this.poiModel.updateOne({ id: poi.id }, { template: { id, name }, token, status: PoiStatus.SurverSent });
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
    await this.poiModel.updateOne({ id: poi.id }, { template: { id, name, questions }, status: PoiStatus.SurverCompleted });
    return this.findByUuid(poi.id);
  }

  async surveyValidate(poi: Poi, createPoiGreenscoreDto: ValidatePoiGreenscoreDto) {
    const status = createPoiGreenscoreDto.valid;
    console.log('Send mail : Poi survey' + (status ? 'valid' : 'refused'));
    await this.poiModel.updateOne({ id: poi.id }, { status });
    return this.findByUuid(poi.id);
  }

  private convertRad(input: number): number{
    return (Math.PI * input)/180;
  }

  private distance(lat: number, lng: number, lat_: number, lng_: number){
    const R = 6378000; // Earth radius in meters

    return R * (Math.PI/2 - Math.asin( 
      Math.sin(this.convertRad(lat_)) * Math.sin(this.convertRad(lat)) + 
      Math.cos(this.convertRad(lng_) - this.convertRad(lng)) * Math.cos(this.convertRad(lat_)) * Math.cos(this.convertRad(lat))
    ));
  }

  async findByCoordinates(lat: number, lng: number): Promise<Poi[]> {
    const allPoi = await this.poiModel.find().exec();
    const radiusToPoiInMeters = parseInt(this.configService.get<string>('RADIUS_TO_POI_IN_METERS'));
    return allPoi.filter((poi: Poi) => this.distance(lat, lng, poi.address.lat, poi.address.lng) < radiusToPoiInMeters);
  }
}
