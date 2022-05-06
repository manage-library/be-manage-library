import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryService } from './history.service';
import { HistoryRepository } from './history.repository';
import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryRepository])],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
