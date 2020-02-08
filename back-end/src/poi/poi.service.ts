import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Poi } from './interfaces/poi.interface';
import { CreatePoiDto } from './dto/create-poi.dto';
import * as uuidv4 from 'uuid/v4';

@Injectable()
export class PoiService {
  constructor(@InjectModel('Poi') private readonly poiModel: Model<Poi>) {}

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
}
