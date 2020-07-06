import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Poi } from './interfaces/poi.interface';
import { CreatePoiDto } from './dto/create-poi.dto';
import * as uuidv4 from 'uuid/v4';
import { UpdatePoiDto } from './dto/update-poi.dto';
import { PoiStatus } from "./model/poi-status.enum";
import { ConfigService } from '@nestjs/config';
import { User } from 'src/company/user/interfaces/user.interface';
import { UserService } from 'src/company/user/user.service';

@Injectable()
export class PoiService {
  constructor(
    @InjectModel('Poi') private readonly poiModel: Model<Poi>,
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {}

  async create(createPoiDto: CreatePoiDto): Promise<Poi> {
    let createdPoi = new this.poiModel(createPoiDto);
    createdPoi.id = uuidv4();
    createdPoi.visits = 0;
    createdPoi.status = PoiStatus.Canvassing;
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

  async visit(poi: Poi, user: User): Promise<Poi> {
    await this.userService.visitPoi(poi, user);
    await this.poiModel.updateOne({ id: poi.id }, { visits: poi.visits + 1 });
    return this.findByUuid(poi.id);
  }

  async like(poi: Poi, user: User): Promise<Poi> {
    const likes = poi.likes;
    if (likes.includes(user.id)) {
      return poi;
    }
    likes.push(user.id);
    await this.poiModel.updateOne({ id: poi.id }, { likes });
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
