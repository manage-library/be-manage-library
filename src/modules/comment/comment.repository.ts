import { CommentEntity } from './comment.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {}
