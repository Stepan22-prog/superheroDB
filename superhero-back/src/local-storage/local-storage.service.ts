import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { promises as fs } from 'fs';
import { StorageService } from 'src/images/storage.interface';

@Injectable()
export class LocalStorageService implements StorageService {
  private readonly uploadDir = join(__dirname, '..', '..', 'uploads');

  get(filename: string) {
    return process.env.SERVER_URL + filename;
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
