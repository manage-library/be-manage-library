import { BookRepository } from './../book/repository/book.repository';
import { TransactionService } from './../transaction/transaction.service';
import { UserRepository } from '@src/modules/user/user.repository';
import { FileService } from '../file/file.service';
export declare class UserService {
    private readonly userRepository;
    private readonly bookRepository;
    private readonly transactionService;
    private readonly fileService;
    constructor(userRepository: UserRepository, bookRepository: BookRepository, transactionService: TransactionService, fileService: FileService);
    getProfile({ userId }: {
        userId: any;
    }): Promise<import("./user.entity").UserEntity>;
    updateProfile({ userId, fullName, avatar, dateOfBirth, gender, vipId }: {
        userId: any;
        fullName: any;
        avatar: any;
        dateOfBirth: any;
        gender: any;
        vipId: any;
    }): void;
    updatePassword({ userId, password, oldPassword }: {
        userId: any;
        password: any;
        oldPassword: any;
    }): Promise<void>;
    getListUser({ keySearch }: {
        keySearch: any;
    }): Promise<import("./user.entity").UserEntity[]>;
    getListAuthor({ keySearch }: {
        keySearch: any;
    }): Promise<import("../book/entity/book.entity").BookEntity[]>;
    adminUpgradeVip({ userId, vipId }: {
        userId: any;
        vipId: any;
    }): Promise<void>;
    uploadAvatar({ userId, file }: {
        userId: any;
        file: any;
    }): Promise<void>;
}
