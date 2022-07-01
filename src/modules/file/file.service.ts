import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { S3 } from 'aws-sdk';

@Injectable()
export class FileService {
  private s3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    });
  }

  async uploadFile({
    dataBuffer,
    filename,
    mimetype,
  }: {
    dataBuffer: Buffer;
    filename: string;
    mimetype: string;
  }) {
    await this.s3
      .upload({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Body: dataBuffer,
        Key: filename,
        ContentType: mimetype,
      })
      .promise();
  }

  public async getPrivateFile(filename: string) {
    const stream = await this.s3
      .getObject({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: filename,
      })
      .createReadStream();

    return {
      stream,
    };
  }
}
