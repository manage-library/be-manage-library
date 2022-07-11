import { FavoriteService } from './favorite.service';
import { JwtGuard } from './../../guards/jwt.guard';
import { Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Favorite')
@ApiBearerAuth()
@Controller('books/:bookId/favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
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

  // @Delete()
  // @UseGuards(JwtGuard)
  // @ApiParam({
  //   name: 'bookId',
  //   type: 'number',
  // })
  // unFavorite(@Req() req: Request) {
  //   const userId = req.user.userId;
  //   const { bookId } = req.params;

  //   return this.favoriteService.unFavorite({ userId, bookId });
  // }
}
