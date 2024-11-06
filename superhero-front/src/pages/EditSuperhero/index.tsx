import { Box, Button, Container, IconButton } from "@mui/material";
import ImageUpload from "../../components/ImageUpload";
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from "react-hook-form";
import { superheroService } from "../../services/superhero.service";
import { SuperheroType } from "../../types/superhero.type";
import { useParams } from "react-router-dom";
import { useImageSync } from "./useImageSync";
import { useSuperheroMutate } from "../../hooks/useSuperheroMutate";
import useGetData from "./useGetData";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import PageTitle from "../../components/PageTitle";
import SuperheroForm from "../../components/SuperheroForm";
import Notification from "../../components/Notification";
import { useDeleteSuperhero } from "../../hooks/useDeleteSuperhero";

export default function EditSuperhero() {
  const { superheroId } = useParams();
  const { control, handleSubmit, setValue } = useForm<SuperheroType>();
  const { 
    images, isImageError, isImageModifying, handleAddImage, handleDeleteImage, setImages 
  } = useImageSync(superheroId as string);

  const { nickname, loading, error } = useGetData({ 
    superheroId: superheroId as string,
    setValue,
    setImages
  });

  const { sendData, isPending: isUpdatePending, error: mutationError } = useSuperheroMutate<string>();
  const onSubmit = (data: SuperheroType) => sendData(() => superheroService.updateInfo(superheroId as string, data));

  const { isPending: isDeletePending, isError, handleDelete } = useDeleteSuperhero(superheroId as string);

  return (
    <Container maxWidth="md">
      {loading && <Loader />}
      {error && <Error />}
      {nickname && 
        <>
          <PageTitle>Edit {nickname}</PageTitle>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} mt={2}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
              {images && images.map((image) => (
                <Box key={image.id} width="200px" height="250px" position="relative">
                  <IconButton 
                    color="error"
                    onClick={() => handleDeleteImage(image.id)}
                    disabled={isImageModifying}
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
              <ImageUpload loading={isImageModifying} handleChange={handleAddImage} />
            </Box>
            <SuperheroForm control={control} />
            <Button 
              type="submit" 
              variant="contained"
              disabled={isUpdatePending}
            >
              {isUpdatePending ? 'Updating...' : 'Update'}
            </Button>
            <Button 
              variant="contained" 
              color="error"
              disabled={isDeletePending}
              onClick={handleDelete}
              sx={{ ml: 1 }}
            >
              {isDeletePending ? 'Deleting...' : 'Delete' }
            </Button>
          </Box>
          <Notification
            isOpen={isError || !!mutationError}
            text={mutationError || 'Failed to delete hero. Try again.'}
            type="error"
          />
          <Notification
            isOpen={!!isImageError}
            text={isImageError === "upload" ? 'Failed to upload image. Try again.' : 'Failed to delete image. Try again.'}
            type="error"
          />
        </>
      }
    </Container>
  )
}
