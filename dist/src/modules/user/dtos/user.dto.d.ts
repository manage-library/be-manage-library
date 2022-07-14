import { EGender, EVip } from './../../../common/enums/index';
import { UserEntity } from '@src/modules/user/user.entity';
export declare class UserResponseDto {
    id: number;
    fullName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(data: Partial<UserResponseDto>);
}
export declare class UserRequestDto {
    fullName: string;
    email: string;
    password: string;
    constructor(data: Partial<UserEntity>);
}
export declare class UpdateProfileUser {
    fullName: string;
    dateOfBirth: string;
    gender: EGender;
    avatar: string;
    vipId: EVip;
}
export declare class UpdatePasswordUser {
    oldPassword: string;
    password: string;
}
export declare class QueryUserDto {
    keySearch: string;
}
export declare class UpgradeVip {
    vipId: EVip;
    status: boolean;
}
export declare class AdminUpgradeVip {
    vipId: EVip;
}
