import { UpdateProfileUser, UpdatePasswordUser, QueryUserDto, AdminUpgradeVip } from './dtos/user.dto';
import { UserService } from './user.service';
import { Request } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(req: Request): Promise<import("./user.entity").UserEntity>;
    getUsers(query: QueryUserDto): Promise<import("./user.entity").UserEntity[]>;
    getAuthors(query: QueryUserDto): Promise<import("../book/entity/book.entity").BookEntity[]>;
    updateProfile(req: Request, body: UpdateProfileUser): void;
    updatePassword(req: Request, body: UpdatePasswordUser): Promise<void>;
    adminUpgradeVip(req: Request, body: AdminUpgradeVip): Promise<void>;
    uploadAvatar(file: any, req: Request): Promise<void>;
}
