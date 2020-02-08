import { Controller, Post, Body, Get, UseGuards, UsePipes, Param, NotFoundException, Put, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCompanyDto } from "./dto/create-company.dto";
import { CompanyService } from "./company.service";
import { Company } from './interfaces/company.interface';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UsersService } from 'src/users/users.service';
import { CustomValidationPipe } from 'src/users/pipes/CustomValidationPipe';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/interfaces/user.interface';

@Controller('companies')
// @UseGuards(AuthGuard('jwt'), RolesGuard)
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly usersService: UsersService
  ) {}

  @Post()
  @Roles('admin')
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    this.companyService.create(createCompanyDto);
  }

  @Get()
  @Roles('admin')
  async findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  @Get(':company_id')
  @Roles('admin')
  async findOne(@Param('company_id') id: string): Promise<Company> {
    return await this.companyService.findByUuid(id);
  }

  @Put(':company_id')
  @Roles('admin')
  async update(@Param('company_id') id: string, @Body() createCompanyDto: CreateCompanyDto) {
    const company = await this.companyService.findByUuid(id);
    this.companyService.update(company, createCompanyDto);
  }

  @Delete(':company_id')
  @Roles('admin')
  async remove(@Param('company_id') id: string) {
    const company = await this.companyService.findByUuid(id);
    this.companyService.delete(company);
  }

  @Post(':company_id/users')
  // @Roles('manager')
  @UsePipes(CustomValidationPipe)
  async createUser(
    @Param('company_id') id,
    @Body() createUserDto: CreateUserDto
  ) {
    const company = await this.companyService.findByUuid(id);
    this.usersService.create(createUserDto, company._id);
  }

  @Get(':company_id/users')
  @Roles('manager')
  async findAllUsers(@Param('company_id') id): Promise<User[]> {
    const company = await this.companyService.findByUuid(id);
    return this.usersService.findAllByCompany(company._id);
  }
}
