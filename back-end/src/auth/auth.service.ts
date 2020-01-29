import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/interfaces/user.interface';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    return await bcrypt.compare(pass, user.password);
  }

  async login(user: User) {
    const payload = { emal: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}