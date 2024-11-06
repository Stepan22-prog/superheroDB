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
import { CreateImageDto } from './dto/create-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createImageDto: CreateImageDto,
  ) {
    return await this.imagesService.uploadOne(
      image,
      createImageDto.superheroId,
    );
  }

  @Delete(':imageId')
  async remove(@Param('imageId') imageId: string) {
    return await this.imagesService.delete(imageId);
  }
}
