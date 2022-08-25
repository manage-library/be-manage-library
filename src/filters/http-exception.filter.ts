import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Logger } from '@src/common/helpers/logger';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(err: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const errResponse = {
      statusCode: err?.status || 500,
      status: false,
      context: err.response?.context,
      message: err.response?.message || err.message,
    };

    this.logger.httpResponseLogError(request, response, {
      context: err.response?.context,
      message: err.response?.message || err.message,
    });

    response.status(err?.status || 500).json(errResponse);
  }
}
