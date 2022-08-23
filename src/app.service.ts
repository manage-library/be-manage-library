import { Injectable } from '@nestjs/common';
import { LogLevel } from './common/enums';
import { Logger } from './common/helpers/logger';

@Injectable()
export class AppService {
  constructor(private readonly logger: Logger) {}
  getHello(): string {
    this.logger.log({
      level: LogLevel.Info,
      message: 'test',
      data: 'aa',
      time: 'qqqq',
    });
    return 'Hello World!';
  }
}
