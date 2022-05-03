import { HistoryEntity } from './history.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(HistoryEntity)
export class HistoryRepository extends Repository<HistoryEntity> {}
