import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';

export class HttpExceptionFilter implements ExceptionFilter {
  catch(err: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(err.status).json({
      statusCode: err.status,
      status: false,
      context: err.response?.context,
      message: err.response?.message,
    });
  }
}
