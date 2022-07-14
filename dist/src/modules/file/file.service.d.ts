/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
export declare class FileService {
    private readonly configService;
    private s3;
    constructor(configService: ConfigService);
    uploadFile({ dataBuffer, filename, mimetype, }: {
        dataBuffer: Buffer;
        filename: string;
        mimetype: string;
    }): Promise<void>;
    getPrivateFile(filename: string): Promise<{
        stream: any;
    }>;
}
