import { Storage } from '@google-cloud/storage';
import { Inject, Injectable } from '@nestjs/common';
import { GOOGLE_STORAGE_OPTIONS } from './constants';
import { GoogleStorageModuleOptions } from './google-storage.module';

@Injectable()
export class GoogleStorageService {
  private readonly bucketName: string;
  private storage = new Storage();

  constructor(
    @Inject(GOOGLE_STORAGE_OPTIONS) options: GoogleStorageModuleOptions,
  ) {
    this.bucketName = options.bucketName;
  }

  async uploadFromMemory(filename: string, content: Express.Multer.File) {
    await this.storage
      .bucket(this.bucketName)
      .file(filename)
      .save(content.buffer);

    console.log('file was uploaded');
  }

  async deleteFile(filename: string) {
    await this.storage.bucket(this.bucketName).file(filename).delete();
  }
}
