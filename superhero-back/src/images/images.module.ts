import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GoogleStorageService } from 'src/google-storage/google-storage.service';
import { LocalStorageService } from 'src/local-storage/local-storage.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: 'StorageService',
      useFactory: (configService: ConfigService) => {
        const storageType = configService.get<'local' | 'cloud'>(
          'STORAGE_TYPE',
          'local',
          { infer: true },
        );
        const bucketName = configService.get<string>('IMAGE_BUCKET_NAME', {
          infer: true,
        });
        return storageType === 'local'
          ? new LocalStorageService(configService)
          : new GoogleStorageService(configService, {
              bucketName: bucketName,
            });
      },
      inject: [ConfigService],
    },
    ImagesService,
  ],
  exports: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
