import { LikeEntity } from './../../like/like.entity';
import { HistoryEntity } from './../../history/history.entity';
import { DownloadEntity } from './../../download/download.entity';
import { CommentEntity } from './../../comment/comment.entity';
import { UserEntity } from '@src/modules/user/user.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookCategoryEntity } from './bookCategory.entity';
import { ChapterEntity } from '@src/modules/chapter/chapter.entity';
import { FavoriteEntity } from '@src/modules/favorite/favorite.entity';

@Entity({ name: 'books' })
export class BookEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column('varchar', { name: 'name' })
  name: string;

  @Column('varchar', { name: 'description' })
  description: string;

  @Column('varchar', { name: 'image' })
  image: string;

  @Column('boolean', { name: 'is_vip' })
  is_vip: boolean;

  @Column('boolean', { name: 'is_visible' })
  is_visible: boolean;

  @Column('int', { name: 'release_status' })
  release_status: number;

  @Column('int', { name: 'author_id' })
  author_id: number;

  @ManyToOne(() => UserEntity, (user) => user.books)
  @JoinColumn({ name: 'author_id', referencedColumnName: 'id' })
  author: UserEntity;

  @OneToMany(() => BookCategoryEntity, (bookCategory) => bookCategory.book)
  bookCategory: BookCategoryEntity[];

  @OneToMany(() => ChapterEntity, (chapter) => chapter.book)
  chapters: ChapterEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.book)
  comments: CommentEntity[];

  @OneToMany(() => DownloadEntity, (download) => download.book)
  downloads: DownloadEntity[];

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.book)
  favorites: FavoriteEntity[];

  @OneToMany(() => LikeEntity, (favorite) => favorite.book)
  likes: LikeEntity[];

  @OneToMany(() => HistoryEntity, (history) => history.book)
  histories: HistoryEntity[];
}
