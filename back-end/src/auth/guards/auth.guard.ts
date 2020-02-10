import { Injectable } from "@nestjs/common";
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {

  handleRequest(err, user, info) {
    console.log('authguard erro ', err);
    console.log('authguard user ', user);
    console.log('authguard info ', info);
    // no error is thrown if no user is found
    // You can use info for logging (e.g. token is expired etc.)
    // e.g.: if (info instanceof TokenExpiredError) ...
    return user;
  }

}