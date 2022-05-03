import { ChapterEntity } from '@src/modules/book/entity/chapter.entity';
import { UserEntity } from '@src/modules/user/user.entity';
import { BookEntity } from './../book/entity/book.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'histories' })
export class HistoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column('int', { name: 'user_id' })
  user_id: number;

  @Column('int', { name: 'book_id' })
  book_id: number;

  @Column('int', { name: 'chapter_id' })
  chapter_id: number;

  @ManyToOne(() => BookEntity, (book) => book.histories)
  @JoinColumn({ name: 'book_id', referencedColumnName: 'id' })
  book: BookEntity;

  @ManyToOne(() => UserEntity, (user) => user.histories)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => ChapterEntity, (chapter) => chapter.histories)
  @JoinColumn({ name: 'chapter_id', referencedColumnName: 'id' })
  chapter: ChapterEntity;
}
