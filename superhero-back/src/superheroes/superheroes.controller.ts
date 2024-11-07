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
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
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
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({
            fileType: /(image\/(jpeg|png|avif|webp|jpg))/,
          }),
        ],
      }),
    )
    images: Array<Express.Multer.File>,
    @Body() createSuperheroDto: CreateSuperheroDto,
  ) {
    const superheroId =
      await this.superheroesService.create(createSuperheroDto);
    await this.imagesService.uploadMany(images, superheroId);

    return superheroId;
  }

  @Get()
  findAll(@Query() params: { page?: string; nickname?: string }) {
    return this.superheroesService.findAll({
      page: +params.page,
      nickname: params.nickname,
      numberOfItems: 5,
    });
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
