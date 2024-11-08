import { useNavigate } from "react-router-dom";
import { SuperheroesShortType } from "../../types/superhero.type";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { superheroService } from "../../services/superhero.service";

export default function useSearch() {
  const navigate = useNavigate();
  const [options, setOptions] = useState<readonly SuperheroesShortType[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [debouncedInputValue] = useDebounce(inputValue, 1000);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const result = await superheroService.getAll(1, debouncedInputValue)
      setOptions(result.data);
      setLoading(false);
    }
    if (debouncedInputValue.length > 1) {
      getData();
    }
  }, [debouncedInputValue]);

  function onSelect(_: React.SyntheticEvent<Element, Event>, newValue: SuperheroesShortType | null) {
    if (newValue) {
      navigate(`/superhero/${newValue?.id}`);
    }
  }

  return { options, loading, setInputValue, onSelect }
}
