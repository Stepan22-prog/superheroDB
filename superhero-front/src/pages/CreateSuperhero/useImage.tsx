import { useState } from "react";

export default function useImage() {
  const [images, setImages] = useState<[] | Array<{ url: string, image: Blob }>>([]);

  function handleAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      setImages(prevImages => [
        ...prevImages, 
        { url: URL.createObjectURL(files[0]), image: files[0] }
      ]);
    }
  }
  
  function handleDelete(imageLink:string) {
    setImages(images => images.filter((image) => image.url !== imageLink))
  }

  return { images, handleAdd, handleDelete };
}
