import { Controller, Post, Body, Get, UseGuards, Param, Put, Delete, UsePipes } from '@nestjs/common';
import { CreateCompanyDto } from "./dto/create-company.dto";
import { CompanyService } from "./company.service";
import { Company } from './interfaces/company.interface';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/auth/userRole.enum';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CustomValidationPipe } from './user/pipes/CustomValidationPipe';
import { CreateUserDto } from './user/dto/create-user.dto';
import { User } from './user/interfaces/user.interface';
import { UserService } from './user/user.service';
import { RequestUser } from 'src/shared/decorator/user.decorator';

@ApiTags('Company')
@Controller('companies')
@UseGuards(AuthGuard, RolesGuard)
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly userService: UserService
  ) {}

  @Post()
  @Roles(UserRole.Admin)
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @Roles(UserRole.Admin)
  async findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  @Get(':company_id')
  @Roles(UserRole.User)
  async findOne(@Param('company_id') id: string, @RequestUser() user): Promise<Company> {
    const company =  await this.companyService.findByUuid(id);
    this.companyService.denyAccessByCompany(user, company);
    return company;
  }

  @Get('domain/:domainName')
  async findOneDomain(@Param('domainName') id: string): Promise<Company> {
    return await this.companyService.findByDomainName(id);
  }

  @Put(':company_id')
  @Roles(UserRole.Admin)
  async update(@Param('company_id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyService.findByUuid(id);
    return this.companyService.update(company, updateCompanyDto);
  }

  @Delete(':company_id')
  @Roles(UserRole.Admin)
  async remove(@Param('company_id') id: string) {
    const company = await this.companyService.findByUuid(id);
    this.companyService.delete(company);
  }

  @Post(':company_id/users')
  @UsePipes(CustomValidationPipe)
  async createUser(
    @Param('company_id') id,
    @Body() createUserDto: CreateUserDto
  ) {
    const company = await this.companyService.findByUuid(id);
    this.companyService.denyAccessByEmail(createUserDto.email, company);
    return this.userService.create(createUserDto, company);
  }

  @Get(':company_id/users')
  @Roles(UserRole.Manager)
  async findAllUsers(@RequestUser() user, @Param('company_id') id): Promise<User[]> {
    const company = await this.companyService.findByUuid(id);
    this.companyService.denyAccessByCompany(user, company);
    return this.userService.findAllByCompany(company.id);
  }
}
