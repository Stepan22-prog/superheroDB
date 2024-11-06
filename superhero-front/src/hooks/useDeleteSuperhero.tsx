import { useNavigate } from "react-router-dom";
import { superheroService } from "../services/superhero.service";
import { useState } from "react";

export function useDeleteSuperhero(superheroId: string) {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  async function handleDelete() {
    setIsError(false);
    setIsPending(true);
    try {
      await superheroService.delete(superheroId);
      navigate('/');
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsPending(false);
    }
  }

  return { isPending, isError, handleDelete }
}