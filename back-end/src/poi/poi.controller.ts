import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards, UseInterceptors, UploadedFiles, Req } from '@nestjs/common';
import { PoiService } from './poi.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserRole } from 'src/auth/userRole.enum';
import { CreatePoiDto } from './dto/create-poi.dto';
import { UpdatePoiDto } from './dto/update-poi.dto';
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
  @Roles(UserRole.User)
  async findAll(): Promise<Poi[]> {
    return this.poiService.findAll();
  }

  @Get(':poi_id')
  @Roles(UserRole.User)
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

  @Post(':poi_id/visited')
  @Roles(UserRole.User)
  async visit(@Param('poi_id') id: string, @Req() req) {
    const poi = await this.poiService.findByUuid(id);
    return this.poiService.visit(poi, req.user);
  }

  @Post(':poi_id/like')
  @Roles(UserRole.User)
  async like(@Param('poi_id') id: string, @Req() req) {
    const poi = await this.poiService.findByUuid(id);
    return this.poiService.like(poi, req.user);
  }
}
