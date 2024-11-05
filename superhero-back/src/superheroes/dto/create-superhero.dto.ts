import { IsString } from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  nickname: string;

  @IsString()
  realName: string;

  @IsString()
  originDescription: string;

  @IsString()
  superpowers: string;

  @IsString()
  catchPhrase: string;
}
