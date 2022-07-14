import { UserEntity } from '@src/modules/user/user.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
export declare class TransactionEntity extends BaseEntity {
    id: number;
    vip_id: number;
    status: number;
    amount: number;
    code: string;
    user_id: number;
    user: UserEntity;
}
