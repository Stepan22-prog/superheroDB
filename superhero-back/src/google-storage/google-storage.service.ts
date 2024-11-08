import { Storage } from '@google-cloud/storage';
import { Inject, Injectable } from '@nestjs/common';
import { GOOGLE_STORAGE_OPTIONS } from './constants';
import { GoogleStorageModuleOptions } from './google-storage.module';
import { StorageService } from 'src/images/storage.interface';
import { STORAGE_URL } from 'src/constants';

@Injectable()
export class GoogleStorageService implements StorageService {
  private readonly bucketName: string;
  private storage = new Storage();

  constructor(
    @Inject(GOOGLE_STORAGE_OPTIONS) options: GoogleStorageModuleOptions,
  ) {
    this.bucketName = options.bucketName;
  }

  get(filename: string) {
    return STORAGE_URL + filename;
  }

  async upload(filename: string, content: Express.Multer.File) {
    await this.storage
      .bucket(this.bucketName)
      .file(filename)
      .save(content.buffer);
  }

  async delete(filename: string) {
    await this.storage.bucket(this.bucketName).file(filename).delete();
  }
}
