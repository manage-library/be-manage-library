import { FileService } from './file.service';
import { Request, Response } from 'express';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    getFile(req: Request, res: Response): Promise<void>;
}
