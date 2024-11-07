import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesService } from './superheroes.service';
import { BadRequestException } from '@nestjs/common';
import { STORAGE_URL } from '../constants';
import { PrismaService } from 'src/prisma/prisma.service';

describe('SuperheroesService', () => {
  let service: SuperheroesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuperheroesService,
        {
          provide: PrismaService,
          useValue: {
            superhero: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              count: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<SuperheroesService>(SuperheroesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a superhero if not exists', async () => {
      prismaService.superhero.findMany = jest.fn().mockResolvedValue([]);
      prismaService.superhero.create = jest.fn().mockResolvedValue({ id: '1' });

      const createDto = {
        id: '1',
        nickname: 'Superman',
        realName: 'Clark Kent',
        originDescription: 'He was born Kal-El on the planet Krypton',
        superpowers:
          'Solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight...',
        catchPhrase:
          "Look, up in the sky, it's a bird, it's a plane, it's Superman!",
      };
      const result = await service.create(createDto);

      expect(result).toBe('1');
      expect(prismaService.superhero.create).toHaveBeenCalledWith({
        data: createDto,
      });
    });

    it('should throw error if superhero already exists', async () => {
      prismaService.superhero.findMany = jest.fn().mockResolvedValue([
        {
          id: '1',
          nickname: 'Superman',
          images: {
            url: 'image1.jpg',
          },
        },
      ]);
      const createDto = {
        id: '1',
        nickname: 'Superman',
        realName: 'Clark Kent',
        originDescription: 'He was born Kal-El on the planet Krypton',
        superpowers:
          'Solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight...',
        catchPhrase:
          "Look, up in the sky, it's a bird, it's a plane, it's Superman!",
      };

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return paginated superheroes with images', async () => {
      prismaService.superhero.count = jest.fn().mockResolvedValue(10);
      prismaService.superhero.findMany = jest.fn().mockResolvedValue([
        {
          id: '1',
          nickname: 'Superman',
          images: [{ url: '/image1.jpg', createdAt: new Date() }],
        },
      ]);

      const result = await service.findAll({ page: 1, numberOfItems: 5 });

      expect(result).toEqual({
        numberOfPages: 2,
        data: [
          {
            id: '1',
            nickname: 'Superman',
            image: STORAGE_URL + '/image1.jpg',
          },
        ],
      });
    });
  });

  describe('findOne', () => {
    it('should return superhero with images', async () => {
      prismaService.superhero.findUnique = jest.fn().mockResolvedValue({
        id: '1',
        nickname: 'Superman',
        realName: 'Clark Kent',
        originDescription: 'He was born Kal-El on the planet Krypton',
        superpowers:
          'Solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight...',
        catchPhrase:
          "Look, up in the sky, it's a bird, it's a plane, it's Superman!",
        images: [
          {
            id: '1',
            url: 'image1.jpg',
            createdAt: new Date(),
            superheroId: '1',
          },
        ],
      });

      const result = await service.findOne('1');

      expect(result).toEqual({
        id: '1',
        nickname: 'Superman',
        realName: 'Clark Kent',
        originDescription: 'He was born Kal-El on the planet Krypton',
        superpowers:
          'Solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight...',
        catchPhrase:
          "Look, up in the sky, it's a bird, it's a plane, it's Superman!",
        images: [
          {
            id: '1',
            url: STORAGE_URL + 'image1.jpg',
          },
        ],
      });
    });
  });

  describe('update', () => {
    it('should update the superhero data', async () => {
      const updateDto = { nickname: 'UpdatedName' };
      const result = await service.update('1', updateDto);

      expect(result).toBe('1');
      expect(prismaService.superhero.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateDto,
      });
    });

    it('should throw error if superhero with such nickname already exists', async () => {
      prismaService.superhero.findMany = jest.fn().mockResolvedValue([
        {
          id: '1',
          nickname: 'Superman',
          images: {
            url: 'image1.jpg',
          },
        },
      ]);
      const updateDto = {
        id: '1',
        nickname: 'Superman',
        realName: 'Clark Kent',
        originDescription: 'He was born Kal-El on the planet Krypton',
      };

      await expect(service.update('1', updateDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('remove', () => {
    it('should delete the superhero by id', async () => {
      await service.remove('1');

      expect(prismaService.superhero.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });
});
