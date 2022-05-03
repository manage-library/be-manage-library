import { DownloadEntity } from './download.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(DownloadEntity)
export class DownloadRepository extends Repository<DownloadEntity> {}
