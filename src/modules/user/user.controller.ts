import { ERole } from '@src/common/enums';
import { Roles } from '@src/common/decorators/roles.decorator';
import { RolesGuard } from '@src/guards/role.guard';
import { JwtGuard } from '@src/guards/jwt.guard';
import {
  UpdateProfileUser,
  UpdatePasswordUser,
  QueryUserDto,
  UpgradeVip,
  AdminUpgradeVip,
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
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  getProfile(@Req() req: Request) {
    const userId = req.user.userId;

    return this.userService.getProfile({ userId });
  }

  @Get('/')
  getUsers(@Query() query: QueryUserDto) {
    return this.userService.getListUser({
      keySearch: query.keySearch,
    });
  }

  @Get('/authors')
  getAuthors(@Query() query: QueryUserDto) {
    return this.userService.getListAuthor({
      keySearch: query.keySearch,
    });
  }

  @Put()
  @UsePipes(ValidationPipe)
  updateProfile(@Req() req: Request, @Body() body: UpdateProfileUser) {
    const userId = req.user.userId;

    return this.userService.updateProfile({ userId, ...body });
  }

  @Put('/change-password')
  updatePassword(@Req() req: Request, @Body() body: UpdatePasswordUser) {
    const userId = req.user.userId;

    return this.userService.updatePassword({ userId, ...body });
  }

  // @Post('/upgrade-vip')
  // upgradeVip(@Req() req: Request, @Body() body: UpgradeVip) {
  //   const userId = req.user.userId;
  //   const { vipId, status } = body;

  //   return this.userService.upgradeVip({ userId, vipId, status });
  // }

  @Post(':userId/upgrade-vip')
  @ApiParam({
    name: 'userId',
    type: 'number',
  })
  @UseGuards(RolesGuard)
  @Roles([ERole.ADMIN])
  adminUpgradeVip(@Req() req: Request, @Body() body: AdminUpgradeVip) {
    const { userId } = req.params;
    const { vipId } = body;

    return this.userService.adminUpgradeVip({ vipId, userId });
  }

  @Post('avatar')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(@UploadedFile() file, @Req() req: Request) {
    const userId = req.user.userId;

    return this.userService.uploadAvatar({ userId, file });
  }
}
