import { UserEntity } from '@src/modules/user/user.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'transactions' })
export class TransactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column('int', { name: 'type' })
  type: number;

  @Column('int', { name: 'status' })
  status: number;

  @Column('int', { name: 'user_id' })
  user_id: number;

  @OneToMany(() => UserEntity, (user) => user.transactions)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
