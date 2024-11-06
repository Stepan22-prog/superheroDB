import { Button, CircularProgress, styled } from "@mui/material";

type ImageUploadPropType = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function ImageUpload({ handleChange, loading }: ImageUploadPropType) {
  
  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
        disabled={loading}
        sx={{ height: '250px', width: '200px' }}
      >
        {loading ? <CircularProgress /> :'Upload image'}
        <VisuallyHiddenInput
          type="file"
          onChange={handleChange}
          multiple
        />
      </Button>
    </>
  )
}
