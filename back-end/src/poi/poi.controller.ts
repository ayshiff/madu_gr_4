import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { PoiService } from './poi.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserRole } from 'src/auth/userRole.enum';
import { CreatePoiDto } from './dto/create-poi.dto';
import { UpdatePoiDto } from './dto/update-poi.dto';
import { CreatePoiGreenscoreDto } from './dto/create-poi-greenscore.dto';
import { AnswerPoiGreenscoreDto } from './dto/answer-poi-greenscore.dto';
import { Poi } from './interfaces/poi.interface';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Poi')
@Controller('poi')
@UseGuards(AuthGuard, RolesGuard)
export class PoiController {
  constructor(
    private readonly poiService: PoiService
  ) {}

  @Post()
  @Roles(UserRole.Admin)
  async create(@Body() createPoiDto: CreatePoiDto) {
    return this.poiService.create(createPoiDto);
  }

  @Get()
  @Roles(UserRole.Admin)
  async findAll(): Promise<Poi[]> {
    return this.poiService.findAll();
  }

  @Get(':poi_id')
  @Roles(UserRole.Admin)
  async findOne(@Param('poi_id') id: string): Promise<Poi> {
    return await this.poiService.findByUuid(id);
  }

  @Put(':poi_id')
  @Roles(UserRole.Admin)
  async update(@Param('poi_id') id: string, @Body() updatePoiDto: UpdatePoiDto) {
    const poi = await this.poiService.findByUuid(id);
    return this.poiService.update(poi, updatePoiDto);
  }

  @Delete(':poi_id')
  @Roles(UserRole.Admin)
  async remove(@Param('poi_id') id: string) {
    const poi = await this.poiService.findByUuid(id);
    return this.poiService.delete(poi);
  }

  @Post(':poi_id/survey/send')
  @Roles(UserRole.Admin)
  async surveySend(@Param('poi_id') id: string, @Body() createPoiGreenscoreDto: CreatePoiGreenscoreDto) {
    const poi = await this.poiService.findByUuid(id);
    return this.poiService.surveySend(poi, createPoiGreenscoreDto);
  }

  @Post(':poi_id/survey/answer')
  @Roles(UserRole.Admin)
  async surveyAnswer(@Param('poi_id') id: string, @Body() answerPoiGreenscoreDto: AnswerPoiGreenscoreDto) {
    const poi = await this.poiService.findByUuid(id);
    return this.poiService.surveyAnswer(poi, answerPoiGreenscoreDto);
  }
}
