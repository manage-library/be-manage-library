import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { LikeRepository } from './like.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([LikeRepository])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
