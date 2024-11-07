import { Test, TestingModule } from '@nestjs/testing';
import { ImagesService } from './images.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleStorageService } from 'src/google-storage/google-storage.service';
import { STORAGE_URL } from 'src/constants';

describe('ImagesService', () => {
  let service: ImagesService;
  let prismaService: PrismaService;
  let googleStorageService: GoogleStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImagesService,
        {
          provide: PrismaService,
          useValue: {
            images: {
              create: jest.fn(),
              findMany: jest.fn(),
              deleteMany: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        {
          provide: GoogleStorageService,
          useValue: {
            uploadFromMemory: jest.fn(),
            deleteFile: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
    prismaService = module.get<PrismaService>(PrismaService);
    googleStorageService =
      module.get<GoogleStorageService>(GoogleStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadOne', () => {
    it('should upload image and save record in the database', async () => {
      const image = { originalname: 'test.jpg' } as Express.Multer.File;
      const superheroId = 'test-superhero-id';

      service.getAllBySuperheroId = jest
        .fn()
        .mockResolvedValue([{ url: `${STORAGE_URL}test.jpg`, id: 'image-id' }]);

      const result = await service.uploadOne(image, superheroId);

      expect(googleStorageService.uploadFromMemory).toHaveBeenCalledWith(
        expect.stringContaining(image.originalname),
        image,
      );
      expect(prismaService.images.create).toHaveBeenCalledWith({
        data: { superheroId, url: expect.any(String) },
      });
      expect(result).toEqual([
        { url: `${STORAGE_URL}test.jpg`, id: 'image-id' },
      ]);
    });
  });

  describe('uploadMany', () => {
    it('should call uploadOne for each image', async () => {
      const images = [
        { originalname: 'test1.jpg' } as Express.Multer.File,
        { originalname: 'test2.jpg' } as Express.Multer.File,
      ];
      const superheroId = 'test-superhero-id';

      jest.spyOn(service, 'uploadOne').mockResolvedValue([]);

      await service.uploadMany(images, superheroId);

      expect(service.uploadOne).toHaveBeenCalledTimes(images.length);
      images.forEach((image) => {
        expect(service.uploadOne).toHaveBeenCalledWith(image, superheroId);
      });
    });
  });

  describe('getAllBySuperheroId', () => {
    it('should return formatted URLs for superhero images', async () => {
      const superheroId = 'test-superhero-id';
      const mockImages = [{ url: 'image-url', id: 'image-id' }];
      prismaService.images.findMany = jest.fn().mockResolvedValue(mockImages);

      const result = await service.getAllBySuperheroId(superheroId);

      expect(prismaService.images.findMany).toHaveBeenCalledWith({
        where: { superheroId },
        select: { url: true, id: true },
        orderBy: { createdAt: 'asc' },
      });
      expect(result).toEqual([
        { url: `${STORAGE_URL}image-url`, id: 'image-id' },
      ]);
    });
  });

  describe('deleteBySuperheroId', () => {
    it('should delete all images for a superhero and remove them from Google Storage', async () => {
      const superheroId = 'test-superhero-id';
      const mockImages = [{ url: 'image-url' }];
      prismaService.images.findMany = jest.fn().mockResolvedValue(mockImages);

      await service.deleteBySuperheroId(superheroId);

      expect(prismaService.images.findMany).toHaveBeenCalledWith({
        where: { superheroId },
      });
      expect(googleStorageService.deleteFile).toHaveBeenCalledWith('image-url');
      expect(prismaService.images.deleteMany).toHaveBeenCalledWith({
        where: { superheroId },
      });
    });
  });

  describe('delete', () => {
    it('should delete a single image and remove it from Google Storage', async () => {
      const imageId = 'test-image-id';
      const mockImage = { url: 'image-url', superheroId: 'test-superhero-id' };
      prismaService.images.delete = jest.fn().mockResolvedValue(mockImage);

      jest.spyOn(service, 'getAllBySuperheroId').mockResolvedValue([]);

      const result = await service.delete(imageId);

      expect(prismaService.images.delete).toHaveBeenCalledWith({
        where: { id: imageId },
      });
      expect(googleStorageService.deleteFile).toHaveBeenCalledWith('image-url');
      expect(result).toEqual([]);
    });
  });
});
