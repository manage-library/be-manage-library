import { CategoryEntity } from '../../category/category.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookEntity } from './book.entity';

@Entity({ name: 'book_category' })
export class BookCategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column('int', { name: 'book_id' })
  book_id: number;

  @Column('int', { name: 'category_id' })
  category_id: number;

  @ManyToOne(() => BookEntity, (book) => book.bookCategory)
  @JoinColumn({ name: 'book_id', referencedColumnName: 'id' })
  book: BookEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.bookCategory)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: CategoryEntity;
}
