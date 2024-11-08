import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorageService } from './storage.interface';

@Injectable()
export class ImagesService {
  constructor(
    private prisma: PrismaService,
    @Inject('StorageService') private storage: StorageService,
  ) {}

  getImageURL(filename: string) {
    return this.storage.get(filename);
  }

  async uploadOne(image: Express.Multer.File, superheroId: string) {
    const filename = image.originalname + Date.now();
    try {
      await this.storage.upload(filename, image);
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

  async uploadMany(images: Express.Multer.File[], superheroId: string) {
    await Promise.all(
      images.map(async (image) => await this.uploadOne(image, superheroId)),
    );
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
      orderBy: {
        createdAt: 'asc',
      },
    });

    return images.map((image) => ({
      url: this.getImageURL(image.url),
      id: image.id,
    }));
  }

  async deleteBySuperheroId(superheroId: string) {
    const imagesOfSuperhero = await this.prisma.images.findMany({
      where: {
        superheroId,
      },
    });
    await Promise.all(
      imagesOfSuperhero.map(async (imageOfSuperhero) => {
        await this.storage.delete(imageOfSuperhero.url);
      }),
    );
    await this.prisma.images.deleteMany({
      where: {
        superheroId,
      },
    });
  }

  async delete(imageId: string) {
    const deletedImage = await this.prisma.images.delete({
      where: {
        id: imageId,
      },
    });
    await this.storage.delete(deletedImage.url);
    return await this.getAllBySuperheroId(deletedImage.superheroId);
  }
}
