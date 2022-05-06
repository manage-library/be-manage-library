import { BookEntity } from './../book/entity/book.entity';
import { HistoryEntity } from '../history/history.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'chapter' })
export class ChapterEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column('varchar', { name: 'name' })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string;

  @Column('longtext', { name: 'content' })
  content: string;

  @Column('int', { name: 'book_id' })
  book_id: number;

  @ManyToOne(() => BookEntity, (book) => book.chapters)
  @JoinColumn({ name: 'book_id', referencedColumnName: 'id' })
  book: BookEntity;

  @OneToMany(() => HistoryEntity, (history) => history.chapter)
  histories: HistoryEntity[];
}
