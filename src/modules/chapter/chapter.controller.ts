import { ERole } from './../../common/enums/index';
import {
  CreateChapterRequestDto,
  UpdateChapterRequestDto,
} from './dto/book.dto';
import { JwtGuard } from '../../guards/jwt.guard';
import { ChapterService } from './chapter.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { RolesGuard } from '@src/guards/role.guard';
import { Roles } from '@src/common/decorators/roles.decorator';
import { VipGuard } from '@src/guards/vip.guard';

@ApiTags('Chapter')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('books/:bookId/chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles([ERole.ADMIN])
  @ApiParam({
    name: 'bookId',
    type: 'number',
  })
  create(@Req() req: Request, @Body() body: CreateChapterRequestDto[]) {
    const { bookId } = req.params;

    return this.chapterService.create({ chapters: body, bookId });
  }

  @Get(':chapterId')
  @Roles([ERole.ADMIN, ERole.USER])
  @UseGuards(RolesGuard)
  @UseGuards(VipGuard)
  @ApiParam({
    name: 'bookId',
    type: 'number',
  })
  @ApiParam({
    name: 'chapterId',
    type: 'number',
  })
  getOne(@Req() req: Request) {
    const userId = req.user.userId;
    const { bookId, chapterId } = req.params;

    return this.chapterService.getOne({ userId, bookId, chapterId });
  }

  @Put(':chapterId')
  @Roles([ERole.ADMIN])
  @UseGuards(RolesGuard)
  @ApiParam({
    name: 'bookId',
    type: 'number',
  })
  @ApiParam({
    name: 'chapterId',
    type: 'number',
  })
  update(@Req() req: Request, @Body() body: UpdateChapterRequestDto) {
    const { bookId, chapterId } = req.params;

    return this.chapterService.update({ ...body, bookId, chapterId });
  }

  @Delete(':chapterId')
  @Roles([ERole.ADMIN])
  @UseGuards(RolesGuard)
  @ApiParam({
    name: 'bookId',
    type: 'number',
  })
  @ApiParam({
    name: 'chapterId',
    type: 'number',
  })
  remove(@Req() req: Request) {
    const { bookId, chapterId } = req.params;

    return this.chapterService.remove({ bookId, chapterId });
  }
}
