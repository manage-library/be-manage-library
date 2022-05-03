import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { CategoryRepository } from './category.repository';
import { BookCategoryRepository } from '../book/repository/bookCategory.repository';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly bookCategoryRepository: BookCategoryRepository,
  ) {}

  async create({ name }) {
    const category = await this.categoryRepository.findOne({
      name,
    });

    if (category) {
      throw new HttpException(
        {
          content: '',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.categoryRepository.save({
      name,
    });
  }

  getList() {
    return this.categoryRepository.find();
  }

  async update({ categoryId, name }) {
    const category = await this.categoryRepository.findOne({
      name,
    });

    if (category && category.id !== categoryId) {
      throw new HttpException(
        {
          content: '',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.categoryRepository.update(
      {
        id: categoryId,
      },
      { name },
    );
  }

  async remove({ categoryId }) {
    const bookCategory = await this.bookCategoryRepository.findOne({
      category_id: categoryId,
    });

    if (bookCategory) {
      throw new HttpException(
        {
          content: '',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.categoryRepository.delete({ id: categoryId });
  }
}
