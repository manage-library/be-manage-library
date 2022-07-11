import { JwtGuard } from './../../guards/jwt.guard';
import { LikeService } from './like.service';
import { Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Like')
@ApiBearerAuth()
@Controller('books/:bookId/like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiParam({
    name: 'bookId',
    type: 'number',
  })
  like(@Req() req: Request) {
    const userId = req.user.userId;
    const { bookId } = req.params;

    return this.likeService.like({ userId, bookId });
  }

  // @Delete()
  // @UseGuards(JwtGuard)
  // @ApiParam({
  //   name: 'bookId',
  //   type: 'number',
  // })
  // unlike(@Req() req: Request) {
  //   const userId = req.user.userId;
  //   const { bookId } = req.params;

  //   return this.likeService.unLike({ userId, bookId });
  // }
}
