import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { GoogleStorageModule } from 'src/google-storage/google-storage.module';
import { ImagesController } from './images.controller';

@Module({
  imports: [
    GoogleStorageModule.register({
      bucketName: process.env.IMAGE_BUCKET_NAME,
    }),
  ],
  providers: [ImagesService],
  exports: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
