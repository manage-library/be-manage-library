import { JwtGuard } from '@src/guards/jwt.guard';
import {
  UpdateProfileUser,
  UpdatePasswordUser,
  QueryUserDto,
  UpgradeVip,
} from './dtos/user.dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
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

  @Get('/profile')
  @UseGuards(JwtGuard)
  getProfile(@Req() req: Request) {
    const userId = req.user.userId;

    return this.userService.getProfile({ userId });
  }

  @Get('/')
  @UseGuards(JwtGuard)
  getUsers(@Query() query: QueryUserDto) {
    return this.userService.getListUser({
      keySearch: query.keySearch,
    });
  }

  @Get('/authors')
  @UseGuards(JwtGuard)
  getAuthors(@Query() query: QueryUserDto) {
    return this.userService.getListAuthor({
      keySearch: query.keySearch,
    });
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

  @Post('/upgrade-vip')
  @UseGuards(JwtGuard)
  upgradeVip(@Req() req: Request, @Body() body: UpgradeVip) {
    const userId = req.user.userId;
    const { vipId, status } = body;

    return this.userService.upgradeVip({ userId, vipId, status });
  }
}
