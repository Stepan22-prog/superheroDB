import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SuperheroesModule } from './superheroes/superheroes.module';
import { GoogleStorageModule } from './google-storage/google-storage.module';

@Module({
  imports: [PrismaModule, SuperheroesModule, GoogleStorageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
