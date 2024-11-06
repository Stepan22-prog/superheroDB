import { Injectable } from '@nestjs/common';
import { STORAGE_URL } from 'src/constants';
import { GoogleStorageService } from 'src/google-storage/google-storage.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImagesService {
  constructor(
    private prisma: PrismaService,
    private googleStorage: GoogleStorageService,
  ) {}

  async uploadOne(image: Express.Multer.File, superheroId: string) {
    const filename = image.originalname + Date.now();
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

    return this.getAllBySuperheroId(superheroId);
  }

  uploadMany(images: Express.Multer.File[], superheroId: string) {
    images.forEach((image) => this.uploadOne(image, superheroId));
  }

  async getAllBySuperheroId(superheroId: string) {
    const images = await this.prisma.images.findMany({
      where: {
        superheroId,
      },
      select: {
        url: true,
        id: true,
      },
    });

    return images.map((image) => ({
      url: STORAGE_URL + image.url,
      id: image.id,
    }));
  }

  async delete(imageId: string) {
    const deletedImage = await this.prisma.images.delete({
      where: {
        id: imageId,
      },
    });
    await this.googleStorage.deleteFile(deletedImage.url);
    return await this.getAllBySuperheroId(deletedImage.superheroId);
  }
}
