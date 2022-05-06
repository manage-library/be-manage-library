import { TransactionEntity } from './../transaction/transaction.entity';
import { HistoryEntity } from './../history/history.entity';
import { FavoriteEntity } from './../favorite/favorite.entity';
import { DownloadEntity } from './../download/download.entity';
import { CommentEntity } from './../comment/comment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '@src/common/entities/base.entity';
import { BookEntity } from './../book/entity/book.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column('varchar', { name: 'full_name', nullable: true })
  full_name: string;

  @Column('varchar', { name: 'email' })
  email: string;

  @Column('varchar', { name: 'password' })
  password: string;

  @Column('int', { name: 'role_id' })
  role_id: number;

  @Column('boolean', { name: 'vip_id' })
  vip_id: number;

  @OneToMany(() => BookEntity, (book) => book.author)
  books: BookEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => DownloadEntity, (download) => download.user)
  downloads: DownloadEntity[];

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.user)
  favorites: FavoriteEntity[];

  @OneToMany(() => HistoryEntity, (history) => history.user)
  histories: HistoryEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.user)
  transactions: TransactionEntity[];
}
