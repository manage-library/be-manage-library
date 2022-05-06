import { LikeEntity } from './like.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(LikeEntity)
export class LikeRepository extends Repository<LikeEntity> {}
