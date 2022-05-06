import { ChapterEntity } from '@src/modules/chapter/chapter.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(ChapterEntity)
export class ChapterRepository extends Repository<ChapterEntity> {}
