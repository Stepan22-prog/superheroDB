import { SuperheroType } from "../types/superhero.type";
import { api } from "./api";

class SuperheroService {
  async create(data: SuperheroType, images: FormData) {
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
    const response = await api.get('/superheroes', {
      params,
    });
    return response;
  }

  async get(superheroId: string) {
    return await api.get(`/superheroes/${superheroId}`);
  }

  async delete(superheroId: string) {
    await api.delete(`/superheroes/${superheroId}`);
  }
}

export const superheroService = new SuperheroService();
