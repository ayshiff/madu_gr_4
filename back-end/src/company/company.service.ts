import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './interfaces/company.interface';
import { CreateCompanyDto } from "./dto/create-company.dto";
const uuidv4 = require('uuid/v4');

@Injectable()
export class CompanyService {
  constructor(@InjectModel('Company') private readonly companyModel: Model<Company>) {}

  async findByIdOr404(id: string): Promise<Company> {
    const company = await this.findByUuid(id);
    if (company === null) {
      throw new NotFoundException('Company not found');
    }
    return company;
  }

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    let createdCompany = new this.companyModel(createCompanyDto);
    createdCompany.id = uuidv4();
    return createdCompany.save();
  }

  async update(company: Company, createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companyModel.updateOne(company, createCompanyDto);
  }

  async delete(company: Company): Promise<Company> {
    return this.companyModel.deleteOne(company);
  }

  async findAll(): Promise<Company[]> {
    return this.companyModel.find().exec();
  }

  async findByUuid(uuid: string): Promise<Company> {
    const company = await this.companyModel.findOne({id: uuid});
    if (company === null) {
      throw new NotFoundException('Company not found');
    }
    return company;
  }
}