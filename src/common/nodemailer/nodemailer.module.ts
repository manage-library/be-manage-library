import { Module } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';

@Module({
  imports: [],
  providers: [NodemailerService],
  exports: [NodemailerService],
})
export class NodemailerModule {}
