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

@ApiTags('Category')
@ApiBearerAuth()
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @UseGuards(JwtGuard)
  getList() {
    const categories = this.categoryService.getList();
    return categories;
  }

  @Post()
  @UseGuards(JwtGuard)
  create(@Req() req: Request, @Body() body: CreateCategoryRequestDto) {
    return this.categoryService.create(body);
  }

  @Put(':categoryId')
  @UseGuards(JwtGuard)
  @ApiParam({
    name: 'categoryId',
    type: 'number',
  })
  update(@Req() req: Request, @Body() body: UpdateCategoryRequestDto) {
    const { categoryId } = req.params;
    return this.categoryService.update({ categoryId, ...body });
  }

  @Delete(':categoryId')
  @UseGuards(JwtGuard)
  @ApiParam({
    name: 'categoryId',
    type: 'number',
  })
  remove(@Req() req: Request) {
    const { categoryId } = req.params;
    return this.categoryService.remove({ categoryId });
  }
}
