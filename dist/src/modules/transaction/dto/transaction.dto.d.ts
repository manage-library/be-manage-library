import { EVip } from './../../../common/enums/index';
export declare class GetTransactionDto {
    userId: number;
    vipId: EVip;
    status: boolean;
}
export declare class RechargeDto {
    signature: string;
    phone: string;
    tranId: number;
    ackTime: string;
    partnerId: string;
    partnerName: string;
    amount: number;
    comment: string;
}
export declare class CreateTransactionDto {
    vipId: number;
}
