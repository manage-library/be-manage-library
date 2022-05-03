import { BookCategoryEntity } from '../entity/bookCategory.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(BookCategoryEntity)
export class BookCategoryRepository extends Repository<BookCategoryEntity> {}
