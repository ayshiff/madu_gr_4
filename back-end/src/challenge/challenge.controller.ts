import { Controller, Post, Body, Get, UseGuards, Param, Put, Delete, UseInterceptors, UploadedFiles, UploadedFile, Req, } from '@nestjs/common';
import { ChallengeDto } from './dto/challenge.dto';
import { ChallengeService } from './challenge.service';
import { Challenge } from './interfaces/challenge.interface';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/auth/userRole.enum';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter, editFileName } from "../interceptor/multer.interceptor";

@ApiTags('Challenge')
@Controller('challenges')
@UseGuards(AuthGuard, RolesGuard)
export class ChallengeController {
  constructor(
    private readonly challengeService: ChallengeService
  ) {}

  @Post()
  @Roles(UserRole.Admin)
  async create(@Body() challengeDto: ChallengeDto) {
    return this.challengeService.create(challengeDto);
  }

  @Get()
  @Roles(UserRole.User)
  async findAll(): Promise<Challenge[]> {
    return this.challengeService.findAll();
  }

  @Get('weekly')
  @Roles(UserRole.User)
  async findOneWeekly(): Promise<Challenge> {
    return await this.challengeService.findWeekly();
  }

  @Get(':challenge_id')
  @Roles(UserRole.User)
  async findOne(@Param('challenge_id') id: string): Promise<Challenge> {
    return await this.challengeService.findByUuid(id);
  }

  @Put(':challenge_id')
  @Roles(UserRole.Admin)
  async update(@Param('challenge_id') id: string, @Body() CompanyDto: ChallengeDto) {
    const challenge = await this.challengeService.findByUuid(id);
    return this.challengeService.update(challenge, CompanyDto);
  }

  @Delete(':challenge_id')
  @Roles(UserRole.Admin)
  async remove(@Param('challenge_id') id: string) {
    const challenge = await this.challengeService.findByUuid(id);
    this.challengeService.delete(challenge);
  }

  @Post(':challenge_id/validate')
  @Roles(UserRole.User)
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './upload',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }))
  async validate(@Param('challenge_id') id: string, @UploadedFile() image, @Req() req) {
    const challenge = await this.challengeService.findByUuid(id);
    return this.challengeService.validate(challenge, req.user, image);
  }
}
