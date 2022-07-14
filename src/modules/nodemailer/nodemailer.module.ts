import { NodeMailerService } from './nodemailer.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [NodeMailerService],
  exports: [NodeMailerService],
})
export class NodeMailModule {}
