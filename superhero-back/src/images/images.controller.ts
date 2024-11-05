import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFiles() image: Express.Multer.File,
    @Body() superheroId: { superheroId: string },
  ) {
    this.imagesService.uploadOne(image, superheroId.superheroId);
  }

  @Delete(':filename')
  remove(@Param('filename') filename: string) {
    this.imagesService.delete(filename);
  }
}
