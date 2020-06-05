import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UsersService } from 'src/users/users.service';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly companyService: CompanyService,
    private readonly usersService: UsersService
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const user =  await this.usersService.findByEmail(payload.email);
    const company = user.company_id === undefined ? undefined : await this.companyService.findByUuid(user.company_id);
    const { id, email, firstname, lastname, roles, companyPosition, points, visits, challenges, department, workplace, photo } = user;
    return { id, email, firstname, lastname, roles, company, companyPosition, points, visits, challenges, department, workplace, photo};
  }
}