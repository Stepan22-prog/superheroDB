import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useSuperheroMutate<T>() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();

  async function sendData(query: () => Promise<T>) {
    setIsPending(true);
    setError(null);
    try {
      const response = await query();
      navigate(`/superhero/${response}`);

    } catch (error) {
      console.error(error);
      setError((error as AxiosError).message);
    } finally {
      setIsPending(false);
    }
  }

  return { sendData, isPending, error };
}
