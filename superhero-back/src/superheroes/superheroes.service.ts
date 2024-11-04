import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
    });

    return {
      numberOfPages: numberOfSuperHeroes / numberOfItems,
      data: superheroes,
    };
  }

  async findOne(id: string) {
    return this.prisma.superhero.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateSuperheroDto: UpdateSuperheroDto) {
    return this.prisma.superhero.update({
      where: {
        id,
      },
      data: updateSuperheroDto,
    });
  }

  remove(id: string) {
    this.prisma.superhero.delete({
      where: {
        id,
      },
    });
  }
}
