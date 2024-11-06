import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { STORAGE_URL } from 'src/constants';

@Injectable()
export class SuperheroesService {
  constructor(private prisma: PrismaService) {}

  async findByNickname(nickname: string) {
    return this.prisma.superhero.findUnique({
      where: {
        nickname,
      },
    });
  }

  async create(createSuperheroDto: CreateSuperheroDto) {
    const isSuperheroExists = await this.findByNickname(
      createSuperheroDto.nickname,
    );

    if (isSuperheroExists) {
      throw new BadRequestException('Superhero already exists');
    }

    const { id } = await this.prisma.superhero.create({
      data: createSuperheroDto,
    });

    return id;
  }

  async findAll(page: number, numberOfItems: number) {
    const numberOfSuperHeroes = await this.prisma.superhero.count();
    const superheroes = await this.prisma.superhero.findMany({
      skip: (page - 1) * numberOfItems,
      take: numberOfItems,
      select: {
        id: true,
        nickname: true,
        images: {
          select: {
            url: true,
          },
        },
      },
    });

    const transformedSuperheroes = superheroes.map((superhero) => ({
      id: superhero.id,
      nickname: superhero.nickname,
      image: superhero.images[0]
        ? STORAGE_URL + superhero.images[0].url
        : STORAGE_URL + 'Superman-costume-action-comics-1000.jpg',
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
        images: true,
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
    return this.prisma.superhero.update({
      where: {
        id,
      },
      data: updateSuperheroDto,
    });
  }

  async remove(id: string) {
    await this.prisma.superhero.delete({
      where: {
        id,
      },
    });
  }
}
