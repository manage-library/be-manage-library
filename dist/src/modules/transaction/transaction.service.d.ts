import { ECTransactionStatus } from './../../common/enums/index';
import { TransactionRepository } from './transaction.repository';
import { UserRepository } from '../user/user.repository';
export declare class TransactionService {
    private readonly transactionRepository;
    private readonly userRepository;
    constructor(transactionRepository: TransactionRepository, userRepository: UserRepository);
    getAll({ userId, status, vipId }: {
        userId: any;
        status: any;
        vipId: any;
    }): Promise<import("./transaction.entity").TransactionEntity[]>;
    create({ userId, vipId }: {
        userId: any;
        vipId: any;
    }): Promise<{
        user_id: any;
        vip_id: any;
        amount: any;
        code: string;
        status: ECTransactionStatus;
    } & import("./transaction.entity").TransactionEntity>;
    recharge({ code, signature }: {
        code: any;
        signature: any;
    }): Promise<void>;
}
