import { Injectable } from '@nestjs/common';
import { GoogleStorageService } from 'src/google-storage/google-storage.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImagesService {
  constructor(
    private prisma: PrismaService,
    private googleStorage: GoogleStorageService,
  ) {}

  async uploadOne(image: Express.Multer.File, superheroId: string) {
    const filename = image.filename + Date.now();
    try {
      await this.googleStorage.uploadFromMemory(filename, image);
    } catch (error) {
      console.log(error);
    }
    await this.prisma.images.create({
      data: {
        superheroId,
        url: filename,
      },
    });
  }

  uploadMany(images: Express.Multer.File[], superheroId: string) {
    images.forEach((image) => this.uploadOne(image, superheroId));
  }

  async delete(filename: string) {
    try {
      await this.googleStorage.deleteFile(filename);
    } catch (error) {
      console.log(error);
    }
    this.prisma.images.deleteMany({
      where: {
        url: filename,
      },
    });
  }
}
