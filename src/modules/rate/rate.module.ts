import { RateService } from './rate.service';
import { RateController } from './rate.controller';
import { RateRepository } from './rate.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([RateRepository])],
  controllers: [RateController],
  providers: [RateService],
})
export class RateModule {}
