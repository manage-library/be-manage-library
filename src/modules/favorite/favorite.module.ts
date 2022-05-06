import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FavoriteRepository } from './favorite.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteRepository])],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
