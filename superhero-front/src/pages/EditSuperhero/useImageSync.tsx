import { useState } from "react";
import { superheroService } from "../../services/superhero.service";
import { ImageType } from "../../types/superhero.type";

export function useImageSync(superheroId: string) {
  const [images, setImages] = useState<null | Array<ImageType>>(null);
  const [isImageModifying, setIsImageModifying] = useState(false);
  const [isImageError, setIsImageError] = useState<false | 'upload' | 'delete'>(false);

  async function handleAddImage(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if(files) {
      setIsImageModifying(true);
      setIsImageError(false);
      try {
        const images = await superheroService.addImage(files[0], superheroId);
        setImages(images);
      } catch (error) {
        console.error(error);
        setIsImageError('upload');
      } finally {
        setIsImageModifying(false);
      }
    }
  } 

  async function handleDeleteImage(imageLink:string) {
    setIsImageModifying(true);
    setIsImageError(false);
    try {
      const images = await superheroService.deleteImage(imageLink);
      setImages(images);
    } catch (error) {
      console.error(error);
      setIsImageError('delete');
    } finally {
      setIsImageModifying(false);
    }
  }

  return { images, isImageError, isImageModifying, handleAddImage, handleDeleteImage, setImages }
}
