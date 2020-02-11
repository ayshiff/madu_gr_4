import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { PoiService } from './poi.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserRole } from 'src/auth/userRole.enum';
import { CreatePoiDto } from './dto/create-poi.dto';
import { CreatePoiGreenscoreDto } from './dto/create-poi-greenscore.dto';
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
    this.poiService.create(createPoiDto);
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
  async update(@Param('poi_id') id: string, @Body() createPoiDto: CreatePoiDto) {
    const poi = await this.poiService.findByUuid(id);
    this.poiService.update(poi, createPoiDto);
  }

  @Delete(':poi_id')
  @Roles(UserRole.Admin)
  async remove(@Param('poi_id') id: string) {
    const poi = await this.poiService.findByUuid(id);
    this.poiService.delete(poi);
  }

  @Post(':poi_id/greenscore')
  @Roles(UserRole.Admin)
  async addTemplate(@Param('poi_id') id: string, @Body() createPoiGreenscoreDto: CreatePoiGreenscoreDto) {
    const poi = await this.poiService.findByUuid(id);
    this.poiService.addTemplate(poi, createPoiGreenscoreDto);
  }
}
