import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GoogleStorageService } from 'src/google-storage/google-storage.service';
import { LocalStorageService } from 'src/local-storage/local-storage.service';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: 'StorageService',
      useFactory: () => {
        return process.env.STORAGE_TYPE === 'local'
          ? new LocalStorageService()
          : new GoogleStorageService({
              bucketName: process.env.IMAGE_BUCKET_NAME,
            });
      },
    },
    ImagesService,
  ],
  exports: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
