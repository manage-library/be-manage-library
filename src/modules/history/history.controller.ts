import { JwtGuard } from './../../guards/jwt.guard';
import { HistoryService } from './history.service';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('History')
@ApiBearerAuth()
@Controller('histories')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  @UseGuards(JwtGuard)
  getList(@Req() req: Request) {
    const userId = req.user.userId;

    return this.historyService.getList({ userId });
  }
}
