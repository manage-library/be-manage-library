import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot()],
  providers: [],
  exports: [TypeOrmModule],
})
export class ConnectionModule {}
