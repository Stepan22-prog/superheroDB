import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SuperheroesModule } from './superheroes/superheroes.module';
import { ImagesModule } from './images/images.module';
import { GoogleStorageModule } from './google-storage/google-storage.module';

@Module({
  imports: [PrismaModule, SuperheroesModule, ImagesModule, GoogleStorageModule],
})
export class AppModule {}
