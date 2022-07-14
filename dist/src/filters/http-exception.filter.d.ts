import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class HttpExceptionFilter implements ExceptionFilter {
    catch(err: any, host: ArgumentsHost): void;
}
