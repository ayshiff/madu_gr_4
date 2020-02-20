import { Controller, Post, Body, Get, UseGuards, UsePipes, Param, NotFoundException, Put, Delete, Request, UnauthorizedException } from '@nestjs/common';
import { CreateCompanyDto } from "./dto/create-company.dto";
import { CompanyService } from "./company.service";
import { Company } from './interfaces/company.interface';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/auth/userRole.enum';
import { UsersService } from 'src/users/users.service';
import { CustomValidationPipe } from 'src/users/pipes/CustomValidationPipe';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/interfaces/user.interface';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateCompanyDto } from './dto/update-company.dto';

@ApiTags('Company')
@Controller('companies')
@UseGuards(AuthGuard, RolesGuard)
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly usersService: UsersService
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
  @Roles(UserRole.Admin)
  async findOne(@Param('company_id') id: string): Promise<Company> {
    return await this.companyService.findByUuid(id);
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
    this.usersService.deleteAllByCompany(company.id);
    this.companyService.delete(company);
  }

  @Post(':company_id/users')
  @Roles(UserRole.Manager)
  @UsePipes(CustomValidationPipe)
  async createUser(
    @Request() req,
    @Param('company_id') id,
    @Body() createUserDto: CreateUserDto
  ) {
    const company = await this.companyService.findByUuid(id);
    this.companyService.denyAccessByCompany(req.user, company);
    return this.usersService.create(createUserDto, company.id);
  }

  @Get(':company_id/users')
  @Roles(UserRole.Manager)
  async findAllUsers(@Request() req, @Param('company_id') id): Promise<User[]> {
    const company = await this.companyService.findByUuid(id);
    this.companyService.denyAccessByCompany(req.user, company);
    return this.usersService.findAllByCompany(company.id);
  }
}
