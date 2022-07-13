import { TransactionService } from './transaction.service';
import { TransactionRepository } from './transaction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionRepository, UserRepository])],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
