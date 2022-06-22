import { JwtGuard } from '@src/guards/jwt.guard';
import { CommentService } from './comment.service';
import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CommentDto } from './dto/comment.dto';

@ApiTags('Comments')
@ApiBearerAuth()
@Controller('books/:bookId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiParam({
    name: 'bookId',
    type: 'number',
  })
  create(@Req() req: Request, @Body() body: CommentDto) {
    const userId = req.user.userId;
    const { bookId } = req.params;

    return this.commentService.create({ ...body, bookId, userId });
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiParam({
    name: 'bookId',
    type: 'number',
  })
  getList(@Req() req: Request) {
    const { bookId } = req.params;

    return this.commentService.getList({ bookId });
  }

  @Put(':commentId')
  @UseGuards(JwtGuard)
  @ApiParam({
    name: 'bookId',
    type: 'number',
  })
  @ApiParam({
    name: 'commentId',
    type: 'number',
  })
  update(@Req() req: Request, @Body() body: CommentDto) {
    const userId = req.user.userId;
    const { bookId, commentId } = req.params;

    return this.commentService.update({ ...body, bookId, userId, commentId });
  }

  @Delete(':commentId')
  @UseGuards(JwtGuard)
  @ApiParam({
    name: 'bookId',
    type: 'number',
  })
  @ApiParam({
    name: 'commentId',
    type: 'number',
  })
  remove(@Req() req: Request) {
    const userId = req.user.userId;
    const { bookId, commentId } = req.params;

    return this.commentService.remove({ bookId, userId, commentId });
  }
}
