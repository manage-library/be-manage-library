import { CreateTransactionDto, GetTransactionDto, RechargeDto } from './dto/transaction.dto';
import { TransactionService } from './transaction.service';
import { Request, Response } from 'express';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    getAllTransaction(query: GetTransactionDto): Promise<import("./transaction.entity").TransactionEntity[]>;
    createTransaction(req: Request, body: CreateTransactionDto): Promise<{
        user_id: any;
        vip_id: any;
        amount: any;
        code: string;
        status: import("@src/common/enums").ECTransactionStatus;
    } & import("./transaction.entity").TransactionEntity>;
    payment(req: Request, body: RechargeDto, res: Response): Promise<void>;
}
