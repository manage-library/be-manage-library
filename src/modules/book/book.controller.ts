import {
  CrawlBook,
  CreateBookRequestDto,
  UpdateBookRequestDto,
} from './dto/book.dto';
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
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Book')
@ApiBearerAuth()
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
  @ApiParam({
    name: 'bookId',
    type: 'number',
  })
  getOne(@Req() req: Request) {
    const userId = req.user.userId;
    const { bookId } = req.params;

    return this.bookService.getOne({ bookId, userId });
  }

  @Post()
  @UseGuards(JwtGuard)
  create(@Req() req: Request, @Body() body: CreateBookRequestDto) {
    const userId = req.user.userId;

    return this.bookService.create({ ...body, authorId: userId });
  }

  @Put(':bookId')
  @UseGuards(JwtGuard)
  @ApiParam({
    name: 'bookId',
    type: 'number',
  })
  update(@Req() req: Request, @Body() body: UpdateBookRequestDto) {
    const { bookId } = req.params;

    return this.bookService.update({ ...body, bookId });
  }

  @Post('/crawl')
  @UseGuards(JwtGuard)
  crawl(@Req() req: Request) {
    const userId = req.user.userId;
    return this.bookService.crawl({ userId });
  }
}
