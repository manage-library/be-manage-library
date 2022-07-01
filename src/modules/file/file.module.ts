import { FileController } from './file.controller';
import { FileService } from './file.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
