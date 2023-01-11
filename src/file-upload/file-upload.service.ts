import { Injectable } from '@nestjs/common';
import { createWriteStream, promises as fs } from 'fs';
import { FileUpload } from 'graphql-upload';
import * as path from 'path';
import { Filename } from 'src/models/filename.model';
import { pipeline } from 'stream/promises';
import * as uuid from 'uuid';

const url = process.env.UPLOAD_URL || 'http://localhost:4337/api/upload';

@Injectable()
export class FileUploadService {
  async createFile(file: FileUpload): Promise<Filename> {
    try {
      const { createReadStream, filename, mimetype } = file;
      const filePath = path.resolve('./src/', 'upload');
      const name = `${uuid.v4()}${Date.now()}.${mimetype.slice(6)}`;
      await pipeline(
        createReadStream(),
        createWriteStream(path.join(filePath, name)),
      );
      return { filename: `${url}/${name}` };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createFiles(files: FileUpload[]): Promise<Filename[]> {
    const filenames = [];
    for (let i = 0; i < files.length; i++) {
      const { createReadStream, filename, mimetype } = files[i];
      const filePath = path.resolve('./src/', 'upload');
      const name = `${uuid.v4()}-${Date.now()}.${mimetype.slice(6)}`;
      await pipeline(
        createReadStream(),
        createWriteStream(path.join(filePath, name)),
      );
      const urlForArray = `${url}/${name}`;
      filenames.push({ filename: urlForArray });
    }
    return filenames;
  }
}
