import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { STORAGE_URL } from 'src/constants';

@Injectable()
export class SuperheroesService {
  constructor(private prisma: PrismaService) {}

  async create(createSuperheroDto: CreateSuperheroDto) {
    const isSuperheroExists = await this.findAll({
      nickname: createSuperheroDto.nickname,
    });

    if (isSuperheroExists.data.length > 0) {
      throw new BadRequestException('Superhero already exists');
    }

    const { id } = await this.prisma.superhero.create({
      data: createSuperheroDto,
    });

    return id;
  }

  async findAll({
    page = 1,
    numberOfItems,
    nickname,
  }: {
    page?: number;
    numberOfItems?: number;
    nickname?: string;
  }) {
    const numberOfSuperHeroes = await this.prisma.superhero.count();
    const superheroes = await this.prisma.superhero.findMany({
      skip: (page - 1) * (numberOfItems ?? 0),
      take: numberOfItems,
      select: {
        id: true,
        nickname: true,
        images: {
          select: {
            url: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
      where: {
        nickname,
      },
    });

    const transformedSuperheroes = superheroes.map((superhero) => ({
      id: superhero.id,
      nickname: superhero.nickname,
      image: superhero.images[0] && STORAGE_URL + superhero.images[0].url,
    }));

    const numberOfPages = Math.ceil(numberOfSuperHeroes / numberOfItems);

    return {
      numberOfPages,
      data: transformedSuperheroes,
    };
  }

  async findOne(id: string) {
    const superhero = await this.prisma.superhero.findUnique({
      where: {
        id,
      },
      include: {
        images: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    const response = {
      ...superhero,
      images: superhero.images.map((image) => ({
        url: STORAGE_URL + image.url,
        id: image.id,
      })),
    };

    return response;
  }

  async update(id: string, updateSuperheroDto: UpdateSuperheroDto) {
    const isSuperheroExists = await this.findAll({
      nickname: updateSuperheroDto.nickname,
    });

    if (isSuperheroExists.data.length > 0) {
      throw new BadRequestException('Superhero already exists');
    }

    await this.prisma.superhero.update({
      where: {
        id,
      },
      data: updateSuperheroDto,
    });
    return id;
  }

  async remove(id: string) {
    await this.prisma.superhero.delete({
      where: {
        id,
      },
    });
  }
}
