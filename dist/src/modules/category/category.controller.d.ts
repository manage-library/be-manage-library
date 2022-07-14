import { CreateCategoryRequestDto, UpdateCategoryRequestDto } from './dto/category.dto';
import { CategoryService } from './category.service';
import { Request } from 'express';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getList(): Promise<import("./category.entity").CategoryEntity[]>;
    create(req: Request, body: CreateCategoryRequestDto): Promise<{
        name: any;
    } & import("./category.entity").CategoryEntity>;
    update(req: Request, body: UpdateCategoryRequestDto): Promise<void>;
    remove(req: Request): Promise<void>;
}
