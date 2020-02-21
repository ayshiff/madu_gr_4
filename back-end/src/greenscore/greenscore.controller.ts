import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards, UsePipes } from '@nestjs/common';
import { QuestionService } from './question.service';
import { TemplateService } from './template.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserRole } from 'src/auth/userRole.enum';
import { CreateQuestionDto } from './dto/create-question.dto';
import { CreateTemplateDto } from './dto/create-template.dto';
import { Question } from './interfaces/question.interface';
import { Template } from './interfaces/template.interface';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { TemplateValidationPipe } from "./validator/TemplateValidationPipe";

@ApiTags('Greenscore')
@Controller()
@UseGuards(AuthGuard, RolesGuard)
export class GreenscoreController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly templateService: TemplateService
  ) {}

  /*
  // this controller will be used in V2
  
  @Post('questions')
  @Roles(UserRole.Admin)
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get('questions')
  @Roles(UserRole.Admin)
  async findAllQuestion(): Promise<Question[]> {
    return this.questionService.findAll();
  }

  @Get('questions/:question_id')
  @Roles(UserRole.Admin)
  async findOneQuestion(@Param('question_id') id: string): Promise<Question> {
    return await this.questionService.findByUuid(id);
  }

  @Put('questions/:question_id')
  @Roles(UserRole.Admin)
  async updateQuestion(@Param('question_id') id: string, @Body() createQuestionDto: CreateQuestionDto) {
    const question = await this.questionService.findByUuid(id);
    return this.questionService.update(question, createQuestionDto);
  }

  @Delete('questions/:question_id')
  @Roles(UserRole.Admin)
  async removeQuestion(@Param('question_id') id: string) {
    const question = await this.questionService.findByUuid(id);
    this.questionService.delete(question);
  }

  @Post('templates')
  @Roles(UserRole.Admin)
  @UsePipes(TemplateValidationPipe)
  async createTemplate(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templateService.create(createTemplateDto);
  }

  @Get('templates')
  @Roles(UserRole.Admin)
  async findAllTemplate(): Promise<Template[]> {
    return this.templateService.findAll();
  }

  @Get('templates/:template_id')
  @Roles(UserRole.Admin)
  async findOneTemplate(@Param('template_id') id: string): Promise<Template> {
    return await this.templateService.findByUuid(id);
  }

  @Put('templates/:template_id')
  @Roles(UserRole.Admin)
  @UsePipes(TemplateValidationPipe)
  async updateTemplate(@Param('template_id') id: string, @Body() createTemplateDto: CreateTemplateDto) {
    const template = await this.templateService.findByUuid(id);
    return this.templateService.update(template, createTemplateDto);
  }

  @Delete('templates/:template_id')
  @Roles(UserRole.Admin)
  async removeTemplate(@Param('template_id') id: string) {
    const template = await this.templateService.findByUuid(id);
    this.templateService.delete(template);
  }
  */
}
