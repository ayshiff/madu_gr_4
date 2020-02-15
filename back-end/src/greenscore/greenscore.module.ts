import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionService } from './question.service';
import { TemplateService } from './template.service';
import { GreenscoreController } from './greenscore.controller';
import { QuestionSchema } from "./schemas/question.schema";
import { TemplateSchema } from "./schemas/template.schema";

@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'Question', schema: QuestionSchema }]),
      MongooseModule.forFeature([{ name: 'Template', schema: TemplateSchema }])
    ],
    providers: [QuestionService, TemplateService],
    controllers: [GreenscoreController],
    exports: [TemplateService]
  })
export class GreenscoreModule {}
