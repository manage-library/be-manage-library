import { RateEntity } from './rate.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(RateEntity)
export class RateRepository extends Repository<RateEntity> {}
