import { BookCategoryEntity } from '../book/entity/bookCategory.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column('varchar', { name: 'name' })
  name: string;

  @OneToMany(() => BookCategoryEntity, (bookCategory) => bookCategory.category)
  bookCategory: BookCategoryEntity[];
}
