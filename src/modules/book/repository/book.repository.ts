import { BookEntity } from './../entity/book.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(BookEntity)
export class BookRepository extends Repository<BookEntity> {}
