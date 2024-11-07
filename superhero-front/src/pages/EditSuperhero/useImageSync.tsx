import { useState } from "react";
import { superheroService } from "../../services/superhero.service";
import { ImageType } from "../../types/superhero.type";
import { AxiosError } from "axios";

export function useImageSync(superheroId: string) {
  const [images, setImages] = useState<null | Array<ImageType>>(null);
  const [isImageModifying, setIsImageModifying] = useState(false);
  const [imageError, setImageError] = useState<null | string>(null);

  async function handleAddImage(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if(files) {
      setIsImageModifying(true);
      setImageError(null);
      try {
        const images = await superheroService.addImage(files[0], superheroId);
        setImages(images);
      } catch (error) {
        console.error(error);
        setImageError((error as AxiosError<{ message: string }>).response?.data.message as string);
      } finally {
        setIsImageModifying(false);
      }
    }
  } 

  async function handleDeleteImage(imageLink:string) {
    setIsImageModifying(true);
    setImageError(null);
    try {
      const images = await superheroService.deleteImage(imageLink);
      setImages(images);
    } catch (error) {
      console.error(error);
      setImageError((error as AxiosError<{ message: string }>).response?.data.message as string);
    } finally {
      setIsImageModifying(false);
    }
  }

  return { images, imageError, isImageModifying, handleAddImage, handleDeleteImage, setImages }
}
