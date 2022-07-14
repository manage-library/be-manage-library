import { ConfigService } from '@nestjs/config';
export declare function generateToken(data: any, configService: ConfigService): {
    accessToken: string;
    refreshToken: string;
};
