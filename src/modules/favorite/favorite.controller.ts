import { FavoriteService } from './favorite.service';
import { JwtGuard } from './../../guards/jwt.guard';
import { Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Favorite')
@ApiBearerAuth()
@Controller()
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post('books/:bookId/favorite')
  @UseGuards(JwtGuard)
  @ApiParam({
    name: 'bookId',
    type: 'number',
  })
  favorite(@Req() req: Request) {
    const userId = req.user.userId;
    const { bookId } = req.params;

    return this.favoriteService.favorite({ userId, bookId });
  }

  @Get('/favorites')
  @UseGuards(JwtGuard)
  getList(@Req() req: Request) {
    const userId = req.user.userId;

    return this.favoriteService.getList({ userId });
  }

  @Delete('books/:bookId/favorite')
  @UseGuards(JwtGuard)
  @ApiParam({
    name: 'bookId',
    type: 'number',
  })
  unFavorite(@Req() req: Request) {
    const userId = req.user.userId;
    const { bookId } = req.params;

    return this.favoriteService.unFavorite({ userId, bookId });
  }
}
