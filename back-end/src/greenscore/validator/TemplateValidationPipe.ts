import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { QuestionService } from '../question.service';
import { CreateTemplateDto } from '../dto/create-template.dto';

@Injectable()
export class TemplateValidationPipe implements PipeTransform<any> {
  constructor(
    private readonly questionService: QuestionService
  ) {}

  async transform(createTemplateDto: CreateTemplateDto, meta) {
    if (meta.type !== 'body') {
      return createTemplateDto;
    }
    const questions = await Promise.all(createTemplateDto.questions.map(async id => {
      const question = await this.questionService.findByUuid(id);
      if (!question) {
        throw new BadRequestException(`Question with  id = ${id} doesn't exist`);
      }
      return question;
    }));
    const { name } = createTemplateDto;
    return {name, questions};
  }
}