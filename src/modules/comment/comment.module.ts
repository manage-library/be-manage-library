import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CommentController } from './comment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
