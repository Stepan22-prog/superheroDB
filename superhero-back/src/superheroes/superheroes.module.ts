import { Module } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { SuperheroesController } from './superheroes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ImagesModule } from 'src/images/images.module';

@Module({
  imports: [PrismaModule, ImagesModule],
  controllers: [SuperheroesController],
  providers: [SuperheroesService],
})
export class SuperheroesModule {}
