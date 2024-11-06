import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
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
    @UploadedFile() image: Express.Multer.File,
    @Body() superheroId: { superheroId: string },
  ) {
    return await this.imagesService.uploadOne(image, superheroId.superheroId);
  }

  @Delete(':imageId')
  async remove(@Param('imageId') imageId: string) {
    return await this.imagesService.delete(imageId);
  }
}
