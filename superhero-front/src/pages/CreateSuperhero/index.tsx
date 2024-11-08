import { Box, Button, Container, IconButton } from "@mui/material";
import { SuperheroType } from "../../types/superhero.type";
import { superheroService } from "../../services/superhero.service";
import useImage from "./useImage";
import { useSuperheroMutate } from "../../hooks/useSuperheroMutate";
import PageTitle from "../../components/PageTitle";
import SuperheroForm from "../../components/SuperheroForm";
import { useForm } from "react-hook-form";
import Notification from "../../components/Notification";
import ImageUpload from "../../components/ImageUpload";
import DeleteIcon from '@mui/icons-material/Delete';

export default function CreateSuperhero() {
  const { images, handleAdd, handleDelete } = useImage();
  const { sendData, isPending, error } = useSuperheroMutate<string>();
  const { control, handleSubmit } = useForm<SuperheroType>();

  const onSubmit = (data: SuperheroType) => sendData(() => superheroService.create(data, images));

  return (
    <Container maxWidth="md">
      <PageTitle>Create superhero</PageTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} mt={2}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {images.length > 0 && images.map((image) => (
            <Box key={image.url} width="200px" height="250px" position="relative">
              <IconButton 
                color="error"
                onClick={() => handleDelete(image.url)}
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
          <ImageUpload loading={isPending} handleChange={handleAdd} />
        </Box>
        <Box display="flex" flexWrap="wrap">
          <SuperheroForm control={control} />
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
    </Container>
  )
}
