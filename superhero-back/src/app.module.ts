import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SuperheroesModule } from './superheroes/superheroes.module';
import { ImagesModule } from './images/images.module';
import { GoogleStorageModule } from './google-storage/google-storage.module';
import { LocalStorageModule } from './local-storage/local-storage.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    PrismaModule,
    SuperheroesModule,
    ImagesModule,
    GoogleStorageModule,
    LocalStorageModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
