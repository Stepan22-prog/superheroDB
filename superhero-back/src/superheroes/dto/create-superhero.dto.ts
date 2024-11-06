import { IsString, Length } from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  @Length(2, 100)
  nickname: string;

  @IsString()
  @Length(2, 100)
  realName: string;

  @IsString()
  @Length(2, 150)
  originDescription: string;

  @IsString()
  @Length(2, 150)
  superpowers: string;

  @IsString()
  @Length(2, 150)
  catchPhrase: string;
}
