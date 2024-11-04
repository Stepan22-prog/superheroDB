import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SuperheroesModule } from './superheroes/superheroes.module';

@Module({
  imports: [PrismaModule, SuperheroesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
