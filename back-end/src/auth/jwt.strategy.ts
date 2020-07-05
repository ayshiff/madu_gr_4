import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UserService } from 'src/company/user/user.service';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly companyService: CompanyService,
    private readonly userService: UserService
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findByEmail(payload.email);
    const company = await this.companyService.findCompanyByUser(user);
    return { ...JSON.parse(JSON.stringify(user)), company };
  }
}