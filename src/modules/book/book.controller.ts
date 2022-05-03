import { CreateBookRequestDto, UpdateBookRequestDto } from './dto/book.dto';
import { JwtGuard } from './../../guards/jwt.guard';
import { BookService } from './book.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Book')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @UseGuards(JwtGuard)
  getList() {
    return this.bookService.getList();
  }

  @Get(':bookId')
  @UseGuards(JwtGuard)
  getOne(@Req() req: Request) {
    const { bookId } = req.params;

    return this.bookService.getOne({ bookId });
  }

  @Post()
  @UseGuards(JwtGuard)
  create(@Req() req: Request, @Body() body: CreateBookRequestDto) {
    const userId = req.user.userId;

    return this.bookService.create({ ...body, authorId: userId });
  }

  @Put(':bookId')
  @UseGuards(JwtGuard)
  update(@Req() req: Request, @Body() body: UpdateBookRequestDto) {
    const { bookId } = req.params;

    return this.bookService.update({ ...body, bookId });
  }

  @Get(':bookId/chapter/:chapterId')
  @UseGuards(JwtGuard)
  getChapterDetail(@Req() req: Request) {
    const { bookId, chapterId } = req.params;
  }
}
