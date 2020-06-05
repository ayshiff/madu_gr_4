import { Controller, Post, Body, Get, UseGuards, Param, Put, Delete, } from '@nestjs/common';
import { AdviceDto } from './dto/advice.dto';
import { AdviceService } from './advice.service';
import { Advice } from './interfaces/advice.interface';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/auth/userRole.enum';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Advice')
@Controller('advices')
@UseGuards(AuthGuard, RolesGuard)
export class AdviceController {
  constructor(
    private readonly adviceService: AdviceService
  ) {}

  @Post()
  @Roles(UserRole.Admin)
  async create(@Body() adviceDto: AdviceDto) {
    return this.adviceService.create(adviceDto);
  }

  @Get()
  @Roles(UserRole.User)
  async findAll(): Promise<Advice[]> {
    return this.adviceService.findAll();
  }

  @Get(':advice_id')
  async findOne(@Param('advice_id') id: string): Promise<Advice> {
    return await this.adviceService.findByUuid(id);
  }

  @Put(':advice_id')
  @Roles(UserRole.Admin)
  async update(@Param('advice_id') id: string, @Body() adviceDto: AdviceDto) {
    const advice = await this.adviceService.findByUuid(id);
    return this.adviceService.update(advice, adviceDto);
  }

  @Delete(':advice_id')
  @Roles(UserRole.Admin)
  async remove(@Param('advice_id') id: string) {
    const advice = await this.adviceService.findByUuid(id);
    this.adviceService.delete(advice);
  }
}
