import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesController } from './superheroes.controller';
import { SuperheroesService } from './superheroes.service';
import { ImagesService } from 'src/images/images.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';

describe('SuperheroesController', () => {
  let controller: SuperheroesController;
  let superheroesService: SuperheroesService;
  let imagesService: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroesController],
      providers: [
        {
          provide: SuperheroesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: ImagesService,
          useValue: {
            uploadMany: jest.fn(),
            deleteBySuperheroId: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SuperheroesController>(SuperheroesController);
    superheroesService = module.get<SuperheroesService>(SuperheroesService);
    imagesService = module.get<ImagesService>(ImagesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new superhero and upload images', async () => {
      const createSuperheroDto: CreateSuperheroDto = {
        nickname: 'Superman',
        realName: 'Clark Kent',
        originDescription: 'He was born Kal-El on the planet Krypton',
        superpowers:
          'Solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight...',
        catchPhrase:
          "Look, up in the sky, it's a bird, it's a plane, it's Superman!",
      };
      const images = [
        { originalname: 'image.jpg', buffer: Buffer.from('') },
      ] as Array<Express.Multer.File>;
      const superheroId = '123';

      jest.spyOn(superheroesService, 'create').mockResolvedValue(superheroId);
      jest.spyOn(imagesService, 'uploadMany').mockResolvedValue(undefined);

      const result = await controller.create(images, createSuperheroDto);

      expect(superheroesService.create).toHaveBeenCalledWith(
        createSuperheroDto,
      );
      expect(imagesService.uploadMany).toHaveBeenCalledWith(
        images,
        superheroId,
      );
      expect(result).toBe(superheroId);
    });
  });

  describe('findAll', () => {
    it('should return a list of superheroes', async () => {
      const mockParams = { page: '1', nickname: 'Hero' };
      const resultData = { numberOfPages: 1, data: [] };
      jest.spyOn(superheroesService, 'findAll').mockResolvedValue(resultData);

      const result = await controller.findAll(mockParams);

      expect(superheroesService.findAll).toHaveBeenCalledWith({
        page: 1,
        nickname: 'Hero',
        numberOfItems: 5,
      });
      expect(result).toBe(resultData);
    });
  });

  describe('findOne', () => {
    it('should return a superhero by id', async () => {
      const superheroId = '123';
      const mockDate = new Date();
      const superhero = {
        id: '1',
        nickname: 'Superman',
        realName: 'Clark Kent',
        originDescription: 'He was born Kal-El on the planet Krypton',
        superpowers:
          'Solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight...',
        catchPhrase:
          "Look, up in the sky, it's a bird, it's a plane, it's Superman!",
        createdAt: mockDate,
        updatedAt: mockDate,
        images: [
          {
            id: '1',
            url: 'image1.jpg',
          },
        ],
      };
      jest.spyOn(superheroesService, 'findOne').mockResolvedValue(superhero);

      const result = await controller.findOne(superheroId);

      expect(superheroesService.findOne).toHaveBeenCalledWith(superheroId);
      expect(result).toBe(superhero);
    });
  });

  describe('update', () => {
    it('should update a superhero', async () => {
      const superheroId = '123';
      const updateSuperheroDto: UpdateSuperheroDto = {
        nickname: 'Updated Hero',
      };

      jest.spyOn(superheroesService, 'update').mockResolvedValue(superheroId);

      const result = await controller.update(superheroId, updateSuperheroDto);

      expect(superheroesService.update).toHaveBeenCalledWith(
        superheroId,
        updateSuperheroDto,
      );
      expect(result).toBe(superheroId);
    });
  });

  describe('remove', () => {
    it('should delete a superhero and its images', async () => {
      const superheroId = '123';

      jest
        .spyOn(imagesService, 'deleteBySuperheroId')
        .mockResolvedValue(undefined);
      jest.spyOn(superheroesService, 'remove').mockResolvedValue(undefined);

      await controller.remove(superheroId);

      expect(imagesService.deleteBySuperheroId).toHaveBeenCalledWith(
        superheroId,
      );
      expect(superheroesService.remove).toHaveBeenCalledWith(superheroId);
    });
  });
});
