import { Roles } from './../../common/decorators/roles.decorator';
import {
  CreateCategoryRequestDto,
  UpdateCategoryRequestDto,
} from './dto/category.dto';
import { JwtGuard } from './../../guards/jwt.guard';
import { CategoryService } from './category.service';
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
import { ERole } from '@src/common/enums';

@ApiTags('Category')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles([ERole.ADMIN, ERole.USER])
  getList() {
    const categories = this.categoryService.getList();
    return categories;
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles([ERole.ADMIN])
  create(@Req() req: Request, @Body() body: CreateCategoryRequestDto) {
    return this.categoryService.create(body);
  }

  @Put(':categoryId')
  @UseGuards(RolesGuard)
  @Roles([ERole.ADMIN])
  @ApiParam({
    name: 'categoryId',
    type: 'number',
  })
  update(@Req() req: Request, @Body() body: UpdateCategoryRequestDto) {
    const { categoryId } = req.params;
    return this.categoryService.update({ categoryId, ...body });
  }

  @Delete(':categoryId')
  @UseGuards(RolesGuard)
  @Roles([ERole.ADMIN])
  @ApiParam({
    name: 'categoryId',
    type: 'number',
  })
  remove(@Req() req: Request) {
    const { categoryId } = req.params;
    return this.categoryService.remove({ categoryId });
  }
}
