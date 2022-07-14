import { ConfigService } from '@nestjs/config';
import { UserRepository } from '@src/modules/user/user.repository';
import { NodeMailerService } from '../nodemailer/nodemailer.service';
export declare class AuthService {
    private readonly userRepository;
    private readonly configService;
    private readonly nodemailerService;
    constructor(userRepository: UserRepository, configService: ConfigService, nodemailerService: NodeMailerService);
    login({ email, password }: {
        email: any;
        password: any;
    }): Promise<{
        accessToken: string;
    }>;
    register({ email, password, fullName }: {
        email: any;
        password: any;
        fullName: any;
    }): Promise<void>;
    forgotPassword({ email }: {
        email: any;
    }): Promise<void>;
    veriForgotPassword({ email, code, password }: {
        email: any;
        code: any;
        password: any;
    }): Promise<void>;
}
