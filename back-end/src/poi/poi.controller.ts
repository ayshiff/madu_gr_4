import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards, UseInterceptors, UploadedFiles, Res, Header } from '@nestjs/common';
import { PoiService } from './poi.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserRole } from 'src/auth/userRole.enum';
import { CreatePoiDto } from './dto/create-poi.dto';
import { UpdatePoiDto } from './dto/update-poi.dto';
import { CreatePoiGreenscoreDto } from './dto/create-poi-greenscore.dto';
import { AnswerPoiGreenscoreDto } from './dto/answer-poi-greenscore.dto';
import { ValidatePoiGreenscoreDto } from './dto/validate-poi-greenscore.dto';
import { Poi } from './interfaces/poi.interface';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter, editFileName } from "../interceptor/multer.interceptor";

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
    this.poiService.delete(poi);
  }

  @Post(':poi_id/images')
  @UseInterceptors(FilesInterceptor('images', 4, {
    storage: diskStorage({
      destination: './upload',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }))
  @Roles(UserRole.Admin)
  async addImages(@Param('poi_id') id: string, @UploadedFiles() images) {
    const poi = await this.poiService.findByUuid(id);
    return this.poiService.addImages(poi, images.map(file => file.filename));
  }

  @Get('/images/:image_id')
  @Header('Content-Type', 'image/jpeg')
  @Roles(UserRole.Admin)
  @ApiResponse({ description: 'An image in jpg format.'})
  async getImage(@Param('image_id') id: string, @Res() res) {
    return res.sendFile(id, { root: 'upload' });
  }

  /*
  // this will be used in V2
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

  @Post(':poi_id/survey/validate')
  @Roles(UserRole.Admin)
  async validate(@Param('poi_id') id: string, @Body() validatePoiGreenscoreDto: ValidatePoiGreenscoreDto) {
    const poi = await this.poiService.findByUuid(id);
    return this.poiService.surveyValidate(poi, validatePoiGreenscoreDto);
  }
  */
}
