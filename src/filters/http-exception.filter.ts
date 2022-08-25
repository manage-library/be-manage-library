import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { LogLevel } from '@src/common/enums';
import { Logger } from '@src/common/helpers/logger';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(err: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const requestLog = {
      title: `HTTP request - ${request.correlationId}`,
      timestamp: new Date().toISOString(),
      correlationId: request.correlationId,
      level: LogLevel.Error,
      statusCode: response.statusCode,
      method: request.method,
      originalUri: request.originalUrl,
      uri: request.url,
      request: {
        params: request.params,
        query: request.query,
        body: request.body,
        headers: request.headers,
      },
    };

    const errResponse = {
      statusCode: err?.status || 500,
      status: false,
      context: err.response?.context,
      message: err.response?.message || err.message,
    };

    this.logger.log({
      level: LogLevel.Error,
      ...requestLog,
      ...errResponse,
    });

    response.status(err?.status || 500).json(errResponse);
  }
}
