import { LikeService } from './rate.service';
import { LikeController } from './rate.controller';
import { RateRepository } from './rate.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([RateRepository])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
