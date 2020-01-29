import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './interfaces/company.interface';
import { CreateCompanyDto } from "./dto/create-company.dto";
const uuidv4 = require('uuid/v4');

@Injectable()
export class CompanyService {
  constructor(@InjectModel('Company') private readonly companyModel: Model<Company>) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    let createdCompany = new this.companyModel(createCompanyDto);
    createdCompany.id = uuidv4();
    return createdCompany.save();
  }

  async findAll(): Promise<Company[]> {
    return this.companyModel.find().exec();
  }

  async findByUuid(uuid: string): Promise<Company> {
    return this.companyModel.findOne({id: uuid});
  }
}