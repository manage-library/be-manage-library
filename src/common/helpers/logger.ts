import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as winstonCloudWatch from 'winston-cloudwatch';
import { LogLevel } from '../enums';

export interface ILogEntry {
  timestamp?: string;
  level: LogLevel;
  message: string;
  title?: string;
  [optionName: string]: any;
}

@Injectable()
export class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.json(),
      transports: [new winston.transports.File({ filename: 'system.log' })],
    });

    if (process.env.NODE_ENV === 'dev') {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
          ),
        }),
      );
    }

    if (process.env.NODE_ENV === 'production') {
      const cloudwatchConfig = {
        logGroupName: process.env.AWS_CLOUD_WATCH_GROUP_NAME,
        logStreamName: `${process.env.AWS_CLOUD_WATCH_GROUP_NAME}-${process.env.NODE_ENV}`,
        awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
        awsSecretKey: process.env.AWS_CLOUD_WATCH_SECRET_ACCESS_KEY,
        awsRegion: process.env.AWS_REGION,
        messageFormatter: ({ level, title, message, ...additionalInfo }) =>
          `[${level}] : ${title || message} \nAdditional Info: ${JSON.stringify(
            {
              message,
              ...additionalInfo,
            },
          )}`,
      };

      this.logger.add(new winstonCloudWatch(cloudwatchConfig));
    }
  }

  httpResponseLog(req: any, res: any, data: any) {
    const responseLog = {
      title: `HTTP request - ${req.correlationId}`,
      message: `HTTP request - ${req.correlationId}`,
      timestamp: new Date().toISOString(),
      correlationId: req.correlationId,
      level: LogLevel.Info,
      status: true,
      statusCode: res.statusCode,
      method: req.method,
      originalUri: req.originalUrl,
      uri: req.url,
      request: {
        params: req.params,
        query: req.query,
        body: req.body,
        headers: req.headers,
      },
      response: {
        data,
      },
    };

    this.log(responseLog);
  }

  httpResponseLogError(req: any, res: any, data: any) {
    const responseLog = {
      title: `HTTP request - ${req.correlationId}`,
      message: `HTTP request - ${req.correlationId}`,
      timestamp: new Date().toISOString(),
      correlationId: req.correlationId,
      level: LogLevel.Error,
      status: false,
      statusCode: res.statusCode,
      method: req.method,
      originalUri: req.originalUrl,
      uri: req.url,
      request: {
        params: req.params,
        query: req.query,
        body: req.body,
        headers: req.headers,
      },
      response: {
        data,
      },
    };

    this.log(responseLog);
  }

  log(logEntry: ILogEntry) {
    if (!logEntry.timestamp) {
      logEntry.timestamp = new Date().toISOString();
    }

    this.logger.log(logEntry);
  }
}
