import { IsString, Length } from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  @Length(2, 100)
  nickname: string;

  @IsString()
  @Length(2, 100)
  realName: string;

  @IsString()
  @Length(2, 200)
  originDescription: string;

  @IsString()
  @Length(2, 200)
  superpowers: string;

  @IsString()
  @Length(2, 200)
  catchPhrase: string;
}
