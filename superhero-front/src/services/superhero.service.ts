import { AllSuperheroesResponseType, CreateSuperheroType, SuperheroDetailsResponseType } from "../types/superhero.type";
import { api } from "./api";

class SuperheroService {
  async create(data: CreateSuperheroType, images: FormData) {
    images.append('data', JSON.stringify(data));
    api.post('/superheroes', images, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
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
}

export const superheroService = new SuperheroService();
