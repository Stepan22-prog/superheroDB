import { Box, Button, IconButton } from "@mui/material";
import ImageUpload from "../ImageUpload";
import FormInput from "../Inputs/FormInput";
import Notification from "../Notification";
import { SuperheroType } from "../../types/superhero.type";
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from "react-hook-form";

type ManageSuperheroType = {
  images: {
    id?: string;
    url: string;
  }[];
  onSubmit: (data: SuperheroType) => Promise<void>;
  isPending: boolean;
  error: string | null;
  handleAdd: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: (image: {id?: string; url: string}) => void;
}

export default function ManageSuperhero({ 
  images, onSubmit, isPending, error, handleAdd, handleDelete 
} : ManageSuperheroType) {
  const { control, handleSubmit } = useForm<SuperheroType>();

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} mt={2}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {images.length > 0 && images.map((image) => (
            <Box key={image.url} width="200px" height="250px" position="relative">
              <IconButton 
                color="error"
                onClick={() => handleDelete(image)}
                sx={{
                  borderRadius: '50%',  
                  position: 'absolute',
                  top: '3px',
                  right: '5px'
                }}
              >
                <DeleteIcon />
              </IconButton>
              <img src={image.url} />
            </Box>
          ))}
          <ImageUpload handleChange={handleAdd} />
        </Box>
        <Box display="flex" flexWrap="wrap">
          <FormInput 
            control={control}
            label="Nickname"
            name="nickname"
            errorText="Nickname is required and must be between 2 and 100 characters long"
            pattern={/^[A-Za-z.,!?]{2,100}$/}
            sx={{ flex: '49%', mr: 1 }}
          />
          <FormInput 
            control={control}
            label="Real name"
            name="realName"
            errorText="Real name is required and must be between 2 and 100 characters long"
            pattern={/^[A-Za-z.,!?]{2,100}$/}
            sx={{ flex: '50%' }}
          />
          <FormInput 
            control={control}
            label="Superpowers"
            name="superpowers"
            errorText="Superpowers are required and must be between 2 and 150 characters long"
            pattern={/^[A-Za-z.,!?]{2,150}$/}
            sx={{ flex: '49%', mr: 1 }}
          />
          <FormInput 
            control={control}
            label="Catch phrase"
            name="catchPhrase"
            errorText="Catch phrase is required and must be between 2 and 150 characters long"
            pattern={/^[A-Za-z.,!?]{2,150}$/}
            sx={{ flex: '50%' }}
          />
          <FormInput 
            control={control}
            label="Origin description"
            name="originDescription"
            errorText="Origin description is required and must be between 2 and 150 characters long"
            pattern={/^[A-Za-z.,!?]{2,150}$/}
            multiline
            sx={{ flex: '100%' }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            disabled={isPending}
          >
            {isPending ? 'Creating...' : 'Create'}
          </Button>
        </Box>
      </Box>
      <Notification
        isOpen={!!error}
        text={error ?? ''}
        type="error"
      />
    </>
  )
}
