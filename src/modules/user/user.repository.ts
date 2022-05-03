import { UserEntity } from '@src/modules/user/user.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
