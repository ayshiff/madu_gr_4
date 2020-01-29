import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  constructor(
    private readonly usersService: UsersService,
    private readonly companyservice: CompanyService
  ) {}

  async transform(value: CreateUserDto) {
    if (await this.usersService.findByEmail(value.email) !== null) {
      throw new BadRequestException('Email already used');
    }

    const company = await this.companyservice.findByUuid(value.company_id);
    if (company === null) {
      throw new BadRequestException('Company not found');
    }
    value.company_id = company._id;
    
    return value
  }
}