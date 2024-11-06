import { IsUUID } from 'class-validator';

export class CreateImageDto {
  @IsUUID()
  superheroId: string;
}
