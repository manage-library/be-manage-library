import { FavoriteEntity } from './favorite.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(FavoriteEntity)
export class FavoriteRepository extends Repository<FavoriteEntity> {}
