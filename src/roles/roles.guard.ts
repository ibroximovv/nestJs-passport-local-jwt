import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/common/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    try {
      const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass()
      ])
      if (!requiredRoles.length) {
        return true
      }
      const request = context.switchToHttp().getRequest()
      return requiredRoles.includes(request['user'].role);
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Internal server error')
    }
  }
}
