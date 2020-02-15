import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../userRole.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      // todo set to false
      return true;
    }
    if (user.roles.includes(UserRole.Admin)) {
      return true;
    }
    for (let i = 0; i < roles.length; i++) {
      const role = roles[i];
      if (user.roles.includes(role)) {
        return true;
      }
    }
    return false;
  }
}