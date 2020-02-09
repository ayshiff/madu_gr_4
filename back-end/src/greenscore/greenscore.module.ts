import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionService } from './question.service';
import { TemplateService } from './template.service';
import { GreenscoreController } from './greenscore.controller';
import { QuestionSchema } from "./schemas/question.schema";
import { TemplateSchema } from "./schemas/template.schema";

@Module({
    imports: [
      MongooseModule.forFeatureAsync([
        {
          name: 'Question',
          useFactory: () => {
            const schema = QuestionSchema;
            schema.pre(/^find/, function(next) {
              this.select({ _id: 0, __v: 0 });
              next();
            });
            return schema;
          },
        },
        {
          name: 'Template',
          useFactory: () => {
            const schema = TemplateSchema;
            schema.pre(/^find/, function(next) {
              this.select({ _id: 0, __v: 0 });
              next();
            });
            return schema;
          },
        }
      ])
    ],
    providers: [QuestionService, TemplateService],
    controllers: [GreenscoreController]
  })
export class GreenscoreModule {}
