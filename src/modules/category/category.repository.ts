import { CategoryEntity } from './category.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(CategoryEntity)
export class CategoryRepository extends Repository<CategoryEntity> {}
