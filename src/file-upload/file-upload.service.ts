import { Injectable } from '@nestjs/common';
import { createWriteStream, promises as fs } from 'fs';
import { FileUpload } from 'graphql-upload';
import * as path from 'path';
import { Filename } from 'src/models/filename.model';
import { pipeline } from 'stream/promises';

@Injectable()
export class FileUploadService {
  async createFile(file: Promise<FileUpload>): Promise<Filename> {
    try {
      const { createReadStream, filename } = await file;
      const filePath = path.resolve('./src/', 'upload');
      await pipeline(
        createReadStream(),
        createWriteStream(path.join(filePath, `${filename}`)),
      );
      return { filename: `${filePath}/${filename}` };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
