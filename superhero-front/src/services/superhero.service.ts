import { AllSuperheroesResponseType, SuperheroType, SuperheroDetailsResponseType, ImageType } from "../types/superhero.type";
import { api } from "./api";

class SuperheroService {
  async create(data: SuperheroType, images:  Array<{ preview: string, image: Blob }>) {
    const formData = new FormData();
    formData.append('nickname', data.nickname);
    formData.append('realName', data.realName);
    formData.append('superpowers', data.superpowers);
    formData.append('catchPhrase', data.catchPhrase);
    formData.append('originDescription', data.originDescription);

    images.forEach((image) => formData.append('images', image.image));

    const superheroId = (await api.post<string>('/superheroes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })).data

    return superheroId;
  }

  async getAll(page: number) {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    const response = await api.get<AllSuperheroesResponseType>('/superheroes', {
      params,
    });
    return response.data;
  }

  async get(superheroId: string) {
    return (await api.get<SuperheroDetailsResponseType>(`/superheroes/${superheroId}`)).data;
  }

  async delete(superheroId: string) {
    await api.delete(`/superheroes/${superheroId}`);
  }

  async updateInfo(superheroId: string, data: SuperheroType) {
    api.put(`/superheroes/${superheroId}`, data);
  }

  async addImage(image: Blob, superheroId: string) {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('superheroId', superheroId);

    return (await api.post<Array<ImageType>>('/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })).data;
  }

  async deleteImage(id: string) {
    return (await api.delete<Array<ImageType>>(`/images/${id}`)).data;
  }
}

export const superheroService = new SuperheroService();
