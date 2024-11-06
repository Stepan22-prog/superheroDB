import { useEffect, useState } from 'react';

type UseEffectQueryType<T> = {
  query: () => Promise<T>;
}

export function useEffectQuery<T>({ query }: UseEffectQueryType<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      setError(false);
      try {
        const response = await query();
        setData(response);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [query]);

  return { data, loading, error };
}
