import { Storage } from '@google-cloud/storage';
import { Inject, Injectable } from '@nestjs/common';
import { GOOGLE_STORAGE_OPTIONS } from './constants';
import { GoogleStorageModuleOptions } from './google-storage.module';
import { StorageService } from 'src/images/storage.interface';
import { GOOGLE_STORAGE_URL } from 'src/constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStorageService implements StorageService {
  private readonly bucketName: string;
  private readonly storageUrl: string;
  private storage = new Storage();

  constructor(
    private configService: ConfigService,
    @Inject(GOOGLE_STORAGE_OPTIONS) options: GoogleStorageModuleOptions,
  ) {
    this.bucketName = options.bucketName;
    this.storageUrl =
      GOOGLE_STORAGE_URL +
      this.configService.get<string>('IMAGE_BUCKET_NAME', {
        infer: true,
      });
  }

  get(filename: string) {
    return this.storageUrl + filename;
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
