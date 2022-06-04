import { BookEntity } from './../modules/book/entity/book.entity';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getRepository } from 'typeorm';
import { UserEntity } from './../modules/user/user.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class VipGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { bookId } = req.params;
    const userId = req?.user?.userId;

    const book = await this.getBook(bookId);

    console.log(book);
    if (book && !book.is_vip) {
      return true;
    }

    if (book && book.is_vip) {
      const user = await this.getUser(userId);

      if (
        user &&
        user.vip_id &&
        user.expired_vip_at &&
        dayjs().isBefore(dayjs(user.expired_vip_at))
      ) {
        return true;
      }
    }

    return false;
  }

  private getUser(userId: number) {
    return getRepository(UserEntity)
      .createQueryBuilder('users')
      .where('users.id = :userId', { userId })
      .getOne();
  }

  private getBook(bookId: number) {
    return getRepository(BookEntity)
      .createQueryBuilder('books')
      .where('books.id = :bookId', { bookId })
      .andWhere('books.is_visible = :isVisible', { isVisible: true })
      .getOne();
  }
}
