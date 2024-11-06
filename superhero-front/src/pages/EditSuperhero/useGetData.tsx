import { useCallback, useEffect } from "react";
import { superheroService } from "../../services/superhero.service";
import { useEffectQuery } from "../../hooks/useEffectQuery";
import { UseFormSetValue } from "react-hook-form";
import { ImageType, SuperheroType } from "../../types/superhero.type";

type useGetDataType = {
  superheroId: string; 
  setValue: UseFormSetValue<SuperheroType>;
  setImages: React.Dispatch<React.SetStateAction<ImageType[] | null>>;
}

export default function useGetData({ superheroId, setValue, setImages } : useGetDataType) {
  const getSuperheroData = useCallback(() => superheroService.get(superheroId as string), [superheroId])
  const { data, loading, error } = useEffectQuery({ query: getSuperheroData });
  useEffect(() => {
    if (data) {
      setValue('catchPhrase', data.catchPhrase);
      setValue('nickname', data.nickname);
      setValue('originDescription', data.originDescription);
      setValue('realName', data.realName);
      setValue('superpowers', data.superpowers);
      setImages(data.images);
    }
  }, [data, setImages, setValue]);

  return { nickname: data?.nickname,loading, error };
}
