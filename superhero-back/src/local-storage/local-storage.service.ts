import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { promises as fs } from 'fs';
import { StorageService } from 'src/images/storage.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalStorageService implements StorageService {
  private readonly uploadDir = join(__dirname, '..', '..', 'uploads');
  private readonly baseUrl: string;

  constructor(private configService: ConfigService) {
    this.baseUrl = this.configService.get<string>(
      'SERVER_URL',
      'http://localhost:3000',
      { infer: true },
    );
  }

  get(filename: string) {
    return this.baseUrl + filename;
  }

  async upload(filename: string, content: Express.Multer.File): Promise<void> {
    const filePath = join(this.uploadDir, filename);
    await fs.mkdir(this.uploadDir, { recursive: true });
    await fs.writeFile(filePath, content.buffer);
  }

  async delete(filename: string): Promise<void> {
    const filePath = join(this.uploadDir, filename);
    await fs.unlink(filePath);
  }
}
