import { CategoryRepository } from './category.repository';
import { BookCategoryRepository } from '../book/repository/bookCategory.repository';
export declare class CategoryService {
    private readonly categoryRepository;
    private readonly bookCategoryRepository;
    constructor(categoryRepository: CategoryRepository, bookCategoryRepository: BookCategoryRepository);
    create({ name }: {
        name: any;
    }): Promise<{
        name: any;
    } & import("./category.entity").CategoryEntity>;
    getList(): Promise<import("./category.entity").CategoryEntity[]>;
    getOne({ name }: {
        name: any;
    }): Promise<import("./category.entity").CategoryEntity>;
    update({ categoryId, name }: {
        categoryId: any;
        name: any;
    }): Promise<void>;
    remove({ categoryId }: {
        categoryId: any;
    }): Promise<void>;
}
