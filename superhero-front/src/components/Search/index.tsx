import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import useSearch from "./useSearch";

export default function Search() {  
  const { options, loading, setInputValue, onSelect } = useSearch();

  return (
    <Autocomplete
      sx={{ width: 300 }}
      filterOptions={(x) => x}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      getOptionLabel={(option) => option.nickname}
      onChange={onSelect}
      options={options}
      noOptionsText="No superheroes"
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search superhero"
          size="small"
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  );
}
