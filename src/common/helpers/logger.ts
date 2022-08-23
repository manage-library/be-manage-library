import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as winstonCloudWatch from 'winston-cloudwatch';
import { LogLevel } from '../enums';

export interface ILogEntry {
  timestamp?: string;
  level: LogLevel;
  message: string;
  [optionName: string]: any;
}

@Injectable()
export class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
          ),
        }),
      ],
    });

    if (process.env.NODE_ENV) {
      const cloudwatchConfig = {
        logGroupName: process.env.AWS_CLOUD_WATCH_GROUP_NAME,
        logStreamName: `${process.env.AWS_CLOUD_WATCH_GROUP_NAME}-${process.env.NODE_ENV}`,
        awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
        awsSecretKey: process.env.AWS_CLOUD_WATCH_SECRET_ACCESS_KEY,
        awsRegion: process.env.AWS_REGION,
        messageFormatter: ({ level, message, ...additionalInfo }) =>
          `[${level}] : ${message} \nAdditional Info: ${JSON.stringify(
            additionalInfo,
          )}`,
      };

      console.log(new winstonCloudWatch(cloudwatchConfig));
      this.logger.add(new winstonCloudWatch(cloudwatchConfig));
    }
  }

  httpRequestLog(req: any, res: any, next: any) {
    const requestLog = {
      timestamp: new Date().toISOString(),
      correlationId: req.correlationId,
      level: LogLevel.Debug,
      clientIP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      method: req.method,
      originalUri: req.originalUrl,
      uri: req.url,
      referer: req.headers.referer || '',
      userAgent: req.headers['user-agent'],
      message: `HTTP Request - ${req.correlationId}`,
      request: {
        body: JSON.parse({ ...req.body }),
        headers: req.headers,
      },
    };
    res.setHeader('x-request-id', req.correlationId);

    this.log(requestLog);
    next();
  }

  httpResponseLog(req: any, res: any, next: any) {
    const rawResponse = res.write;
    const rawResponseEnd = res.end;
    const chunks: any[] = [];
    res.write = (...restArgs: any[]) => {
      chunks.push(new Buffer(restArgs[0]));
      rawResponse.apply(res, restArgs);
    };
    res.end = (...restArgs: any[]) => {
      if (restArgs[0]) {
        chunks.push(new Buffer(restArgs[0]));
      }
      const body = Buffer.concat(chunks).toString('utf8');

      const responseLog = {
        timestamp: new Date().toISOString(),
        correlationId: req.correlationId,
        level: LogLevel.Debug,
        statusCode: res.statusCode,
        clientIP:
          req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        method: req.method,
        originalUri: req.originalUrl,
        uri: req.url,
        referer: req.headers.referer || '',
        userAgent: req.headers['user-agent'],
        message: `HTTP Response - ${req.correlationId}`,
        request: {
          body: req.body,
          headers: req.headers,
        },
        response: {
          body,
          headers: res.getHeaders(),
        },
      };

      this.log(responseLog);
      rawResponseEnd.apply(res, restArgs);
    };

    next();
  }

  log(logEntry: ILogEntry) {
    if (!logEntry.timestamp) {
      logEntry.timestamp = new Date().toISOString();
    }

    this.logger.log(logEntry);
  }
}
