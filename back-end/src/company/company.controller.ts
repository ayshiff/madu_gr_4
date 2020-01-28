import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateCompanyDto } from "./dto/create-company.dto";
import { CompanyService } from "./company.service";
import { Company } from './interfaces/company.interface';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    this.companyService.create(createCompanyDto);
  }

  @Get()
  async findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }
}
