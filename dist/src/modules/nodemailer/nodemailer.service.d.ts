import { ConfigService } from '@nestjs/config';
export declare class NodeMailerService {
    private readonly configService;
    private oAuth2Client;
    constructor(configService: ConfigService);
    sendMail({ email, code }: {
        email: any;
        code: any;
    }): Promise<void>;
}
