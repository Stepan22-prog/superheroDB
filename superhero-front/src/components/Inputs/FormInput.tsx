/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

type InputProps = {
  control: Control<any>;
  label: string;
  name?: string;
  errorText?: string;
  required?: boolean;
  pattern?: RegExp;
  multiline?: boolean;
  sx?: object;
};

export default function FormInput({
  control,
  label,
  name,
  errorText,
  required = true,
  pattern,
  multiline = false,
  sx,
}: InputProps) {
  return (
    <Controller
      name={name ?? label.toLowerCase()}
      control={control}
      rules={{
        required,
        pattern,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          InputLabelProps={{ shrink: value }}
          required={required}
          helperText={error ? errorText : null}
          size="small"
          margin="dense"
          error={!!error}
          onChange={(event) => onChange(event.target.value)}
          value={value ?? ''}
          label={label}
          multiline={multiline}
          variant="outlined"
          sx={sx}
        />
      )}
    />
  );
}
