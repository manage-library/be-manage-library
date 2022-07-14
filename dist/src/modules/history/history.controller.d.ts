import { HistoryService } from './history.service';
import { Request } from 'express';
export declare class HistoryController {
    private readonly historyService;
    constructor(historyService: HistoryService);
    getList(req: Request): Promise<import("./history.entity").HistoryEntity[]>;
}
