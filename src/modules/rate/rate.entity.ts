import { UserEntity } from '@src/modules/user/user.entity';
import { BookEntity } from '../book/entity/book.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'rates' })
export class RateEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column('int', { name: 'user_id' })
  user_id: number;

  @Column('int', { name: 'book_id' })
  book_id: number;

  @Column('int', { name: 'rate' })
  rate: number;

  @ManyToOne(() => BookEntity, (book) => book.likes)
  @JoinColumn({ name: 'book_id', referencedColumnName: 'id' })
  book: BookEntity;

  @ManyToOne(() => UserEntity, (user) => user.favorites)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
