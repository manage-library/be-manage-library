import { LikeEntity } from './../like/like.entity';
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

  @Column('datetime', { name: 'date_of_birth', nullable: true })
  date_of_birth: Date;

  @Column('int', { name: 'gender', nullable: true })
  gender: number;

  @Column('varchar', { name: 'avatar', nullable: true })
  avatar: string;

  @Column('int', { name: 'role_id' })
  role_id: number;

  @Column('int', { name: 'vip_id' })
  vip_id: number;

  @Column('datetime', { name: 'expired_vip_at', nullable: true })
  expired_vip_at: Date;

  @OneToMany(() => BookEntity, (book) => book.author)
  books: BookEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => DownloadEntity, (download) => download.user)
  downloads: DownloadEntity[];

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.user)
  favorites: FavoriteEntity[];

  @OneToMany(() => LikeEntity, (like) => like.user)
  likes: LikeEntity[];

  @OneToMany(() => HistoryEntity, (history) => history.user)
  histories: HistoryEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.user)
  transactions: TransactionEntity[];
}
