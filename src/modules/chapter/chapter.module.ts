import { TypeOrmModule } from '@nestjs/typeorm';
import { ChapterService } from './chapter.service';
import { ChapterRepository } from './chapter.repository';
import { Module } from '@nestjs/common';
import { HistoryModule } from '../history/history.module';
import { ChapterController } from './chapter.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChapterRepository]),
    HistoryModule,
  ],
  controllers: [ChapterController],
  providers: [ChapterService],
  exports: [ChapterService],
})
export class ChapterModule {}
