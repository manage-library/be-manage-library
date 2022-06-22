import { PaginateDto } from './../../dto/paginate';
import {
  CrawlBook,
  CreateBookRequestDto,
  QueryBookDto,
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
  Query,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Roles } from '@src/common/decorators/roles.decorator';
import { ERole } from '@src/common/enums';
import { RolesGuard } from '@src/guards/role.guard';
import { VipGuard } from '@src/guards/vip.guard';

@ApiTags('Book')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles([ERole.ADMIN, ERole.USER])
  getList(
    @Req() req: Request,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    query: QueryBookDto,
  ) {
    const userId = req.user.userId;
    return this.bookService.getList({ query, userId });
  }

  @Get(':bookId')
  @Roles([ERole.ADMIN, ERole.USER])
  @UseGuards(RolesGuard)
  @ApiParam({
    name: 'bookId',
    type: 'number',
  })
  getOne(@Req() req: Request, @Query() { page, perPage }: PaginateDto) {
    const userId = req.user.userId;
    const { bookId } = req.params;

    return this.bookService.getOne({ bookId, userId, page, perPage });
  }

  @Get(':bookId/download')
  @UseGuards(RolesGuard)
  @Roles([ERole.ADMIN, ERole.USER])
  @ApiParam({
    name: 'bookId',
    type: 'number',
  })
  async downloadFile(@Req() req: Request, @Res() res: Response) {
    const userId = req.user.userId;
    const { bookId } = req.params;

    const { buffer, book } = await this.bookService.downloadFile({
      userId,
      bookId,
    });

    console.log(buffer);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=test.pdf`,
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles([ERole.ADMIN])
  create(@Req() req: Request, @Body() body: CreateBookRequestDto) {
    const userId = req.user.userId;

    return this.bookService.create({ ...body, authorId: userId });
  }

  @Put(':bookId')
  @UseGuards(RolesGuard)
  @Roles([ERole.ADMIN])
  @ApiParam({
    name: 'bookId',
    type: 'number',
  })
  update(@Req() req: Request, @Body() body: UpdateBookRequestDto) {
    const { bookId } = req.params;

    return this.bookService.update({ ...body, bookId });
  }

  @Post('/crawl')
  @UseGuards(RolesGuard)
  @Roles([ERole.ADMIN])
  crawl(@Req() req: Request) {
    const userId = req.user.userId;
    return this.bookService.crawl({ userId });
  }
}
