import { AuthService } from './auth.service';
import { ForgotPasswordDto, LoginRequestDto, RegisterRequestDto, VerifyForgotPasswordDto } from './dtos/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginRequestDto): Promise<{
        accessToken: string;
    }>;
    register(body: RegisterRequestDto): Promise<void>;
    forgotPassword(body: ForgotPasswordDto): Promise<void>;
    verifyForgotPassword(body: VerifyForgotPasswordDto): Promise<void>;
}
