import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERole } from '@src/common/enums';
import { UserRepository } from './../modules/user/user.repository';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<ERole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const userId = req?.user?.userId;

    const user = await this.userRepository.findOne({
      id: userId,
    });

    return user && requireRoles.includes(user.role_id) ? true : false;
  }
}
