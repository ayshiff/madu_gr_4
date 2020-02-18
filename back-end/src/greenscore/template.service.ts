import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Template } from './interfaces/template.interface';
import { CreateTemplateDto } from './dto/create-template.dto';
import * as uuidv4 from 'uuid/v4';
import { QuestionService } from './question.service';

@Injectable()
export class TemplateService {
  constructor(
    @InjectModel('Template') private readonly templateModel: Model<Template>,
    private readonly questionService: QuestionService
  ) {}

  async create(createTemplateDto: CreateTemplateDto) {
    let createdTemplate = new this.templateModel(createTemplateDto);
    createdTemplate.id = uuidv4();
    await createdTemplate.save();
    return this.findByUuid(createdTemplate.id);
  }

  async update(template: Template, createTemplateDto: CreateTemplateDto): Promise<Template> {
    await this.templateModel.updateOne({ id: template.id }, createTemplateDto);
    return this.findByUuid(template.id);
  }

  async delete(template: Template): Promise<Template> {
    return this.templateModel.deleteOne({ id: template.id });
  }

  async findAll(): Promise<Template[]> {
    return this.templateModel.find().exec();
  }

  async findByUuid(uuid: string): Promise<Template> {
    const template = await this.templateModel.findOne({id: uuid});
    if (template === null) {
      throw new NotFoundException('Template not found');
    }
    return template;
  }
}
