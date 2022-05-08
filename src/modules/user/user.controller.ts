import { JwtGuard } from './../../guards/jwt.guard';
import { UpdateProfileUser, UpdatePasswordUser } from './dtos/user.dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtGuard)
  getProfile(@Req() req: Request) {
    const userId = req.user.userId;

    return this.userService.getProfile({ userId });
  }

  @Put()
  @UseGuards(JwtGuard)
  @UsePipes(ValidationPipe)
  updateProfile(@Req() req: Request, @Body() body: UpdateProfileUser) {
    const userId = req.user.userId;

    return this.userService.updateProfile({ userId, ...body });
  }

  @Put('/change-password')
  @UseGuards(JwtGuard)
  updatePassword(@Req() req: Request, @Body() body: UpdatePasswordUser) {
    const userId = req.user.userId;

    return this.userService.updatePassword({ userId, ...body });
  }
}
