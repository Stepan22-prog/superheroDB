import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from 'src/images/images.service';

@Controller('superheroes')
export class SuperheroesController {
  constructor(
    private readonly superheroesService: SuperheroesService,
    private readonly imagesService: ImagesService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() createSuperheroDto: CreateSuperheroDto,
  ) {
    const superheroId =
      await this.superheroesService.create(createSuperheroDto);
    await this.imagesService.uploadMany(images, superheroId);

    return superheroId;
  }

  @Get()
  findAll(@Query('page') page: string) {
    return this.superheroesService.findAll(+page, 5);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.superheroesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSuperheroDto: UpdateSuperheroDto,
  ) {
    return this.superheroesService.update(id, updateSuperheroDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.imagesService.deleteBySuperheroId(id);
    await this.superheroesService.remove(id);
  }
}
