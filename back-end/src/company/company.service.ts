import { Model } from "mongoose";
import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Company } from "./interfaces/company.interface";
import { CreateCompanyDto } from "./dto/create-company.dto";
import * as uuidv4 from "uuid/v4";
import { User } from "src/users/interfaces/user.interface";
import { UserRole } from "src/auth/userRole.enum";
import { CompanyStatus } from "./model/company-status.enum";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { PoiService } from "src/poi/poi.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel("Company") private readonly companyModel: Model<Company>,
    private readonly poiService: PoiService,
    private readonly configService: ConfigService
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    let createdCompany = new this.companyModel(createCompanyDto);
    createdCompany.id = uuidv4();

    const { lat, lng } = createCompanyDto.address;
    const countPoi = (await this.poiService.findByCoordinates(lat, lng)).length;
    const nbPoiNeededToValidateCompany = parseInt(
      this.configService.get<string>("NB_POI_NEEDED_TO_VALIDATE_COMPANY")
    );
    createdCompany.status =
      countPoi < nbPoiNeededToValidateCompany
        ? CompanyStatus.NotEnoughPoi
        : CompanyStatus.Canvassing;

    await createdCompany.save();
    return this.findByUuid(createdCompany.id);
  }

  async update(
    company: Company,
    updateCompanyDto: UpdateCompanyDto
  ): Promise<Company> {
    await this.companyModel.updateOne({ id: company.id }, updateCompanyDto);
    return this.findByUuid(company.id);
  }

  async delete(company: Company): Promise<Company> {
    return this.companyModel.deleteOne(company);
  }

  async findAll(): Promise<Company[]> {
    return this.companyModel.find().exec();
  }

  async findByUuid(uuid: string): Promise<Company> {
    const company = await this.companyModel.findOne({ id: uuid });
    if (company === null) {
      throw new NotFoundException("Company not found");
    }
    return company;
  }

  denyAccessByCompany(user: User, company: Company) {
    if (
      !user.roles.includes(UserRole.Admin) &&
      company.id + "" !== user.company_id + ""
    ) {
      throw new UnauthorizedException();
    }
  }
}
