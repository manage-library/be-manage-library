import { FileService } from './file.service';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('File')
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(':filename')
  @ApiParam({
    name: 'filename',
    type: 'string',
  })
  async getFile(@Req() req: Request, @Res() res: Response) {
    const { filename } = req.params;

    const file = await this.fileService.getPrivateFile(filename);
    file.stream.pipe(res);
  }
}
