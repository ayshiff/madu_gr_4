import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {

  handleRequest(err, user, info) {
    if (info && info.name === 'TokenExpiredError') {
      throw new UnauthorizedException();
    }
    return user;
  }

}