import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { LogLevel } from '@src/common/enums';
import { Logger } from '@src/common/helpers/logger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  status: boolean;
  data: T;
}

const statusSuccess = [200, 201, 204];

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private readonly logger: Logger) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        const requestLog = {
          title: `HTTP request - ${request.correlationId}`,
          message: `HTTP request - ${request.correlationId}`,
          timestamp: new Date().toISOString(),
          correlationId: request.correlationId,
          level: LogLevel.Debug,
          method: request.method,
          statusCode: response.statusCode,
          originalUri: request.originalUrl,
          uri: request.url,
          request: {
            params: request.params,
            query: request.query,
            body: request.body,
            headers: request.headers,
          },
          response: data,
        };

        this.logger.log(requestLog);

        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          status: statusSuccess.includes(
            context.switchToHttp().getResponse().statusCode,
          ),
          data: data,
        };
      }),
    );
  }
}
