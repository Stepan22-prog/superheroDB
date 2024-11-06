import { useState } from "react";
import { superheroService } from "../../services/superhero.service";
import { ImageType } from "../../types/superhero.type";

export function useImageSync(superheroId: string) {
  const [images, setImages] = useState<null | Array<ImageType>>(null);

  async function handleAddImage(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if(files) {
      setImages(await superheroService.addImage(files[0], superheroId));
    }
  } 

  async function handleDeleteImage(imageLink:string) {
    setImages(await superheroService.deleteImage(imageLink));
  }

  return { images, handleAddImage, handleDeleteImage, setImages }
}
