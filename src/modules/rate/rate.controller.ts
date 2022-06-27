import { JwtGuard } from '../../guards/jwt.guard';
import { RateService } from './rate.service';
import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiParam,
  ApiProperty,
  ApiTags,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Request } from 'express';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class RateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  rate: number;

  @ApiPropertyOptional()
  @IsString()
  content: string;
}

@ApiTags('Rate')
@ApiBearerAuth()
@Controller('books/:bookId/rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiParam({
    name: 'bookId',
    type: 'number',
  })
  create(@Req() req: Request, @Body() body: RateDto) {
    const userId = req.user.userId;
    const { bookId } = req.params;
    const { rate, content } = body;

    return this.rateService.create({ userId, bookId, rate, content });
  }
}
