import { ChapterEntity } from '@src/modules/book/entity/chapter.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(ChapterEntity)
export class ChapterRepository extends Repository<ChapterEntity> {}
