import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERole } from '@src/common/enums';
import { getRepository } from 'typeorm';
import { UserEntity } from './../modules/user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

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

    const user = await this.getUser(userId);

    return user && requireRoles.includes(user.role_id) ? true : false;
  }

  private getUser(userId: number) {
    return getRepository(UserEntity)
      .createQueryBuilder('users')
      .where('users.id = :userId', { userId })
      .getOne();
  }
}
