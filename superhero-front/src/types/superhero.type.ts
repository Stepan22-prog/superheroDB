export type SuperheroType = {
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string;
  catchPhrase: string;
}

export type AllSuperheroesResponseType = {
  numberOfPages: number;
  data: {
    id: string;
    nickname: string;
    image: string;
  }[]
}

export type ImageType = {
  id: string; 
  url: string
}

export type SuperheroDetailsResponseType = {
  id: string;
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string;
  catchPhrase: string;
  images: Array<ImageType>;
}
