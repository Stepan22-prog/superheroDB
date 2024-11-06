import { Box, Button, Container, IconButton } from "@mui/material";
import ImageUpload from "../../components/ImageUpload";
import FormInput from "../../components/Inputs/FormInput";
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { superheroService } from "../../services/superhero.service";
import { CreateSuperheroType } from "../../types/superhero.type";
import { useParams } from "react-router-dom";

export default function EditSuperhero() {
  const { superheroId } = useParams();
  const { control, handleSubmit, setValue } = useForm<CreateSuperheroType>();

  const [images, setImages] = useState<null | Array<{ id: string, url: string }>>(null);
  useEffect(() => {
    async function getData() {
      const response = await superheroService.get(superheroId as string);
      setValue('catchPhrase', response.catchPhrase);
      setValue('nickname', response.nickname);
      setValue('originDescription', response.originDescription);
      setValue('realName', response.realName);
      setValue('superpowers', response.superpowers);
      setImages(response.images);
    }
    getData();
  }, [superheroId, setValue]);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setImages(await superheroService.addImage(e.target.files[0], superheroId as string));
  } 

  async function handleDeleteImage(imageLink:string) {
    setImages(await superheroService.deleteImage(imageLink));
  }

  function sendData(data: CreateSuperheroType) {
    superheroService.updateInfo(superheroId as string, data);
  }

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit(sendData)} mt={2}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {images && images.map((image) => (
            <Box key={image.id} width="200px" height="250px" position="relative">
              <IconButton 
                color="error"
                onClick={() => handleDeleteImage(image.id)}
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
          <ImageUpload handleChange={handleChange} />
        </Box>
        <Box display="flex" flexWrap="wrap">
          <FormInput 
            control={control}
            label="Nickname"
            name="nickname"
            errorText="Nickname is required and should have at least 2 symbols"
            sx={{ flex: '49%', mr: 1 }}
          />
          <FormInput 
            control={control}
            label="Real name"
            name="realName"
            errorText="Nickname is required and should have at least 2 symbols"
            sx={{ flex: '50%' }}
          />
          <FormInput 
            control={control}
            label="Superpowers"
            name="superpowers"
            errorText="Nickname is required and should have at least 2 symbols"
            sx={{ flex: '49%', mr: 1 }}
          />
          <FormInput 
            control={control}
            label="Catch phrase"
            name="catchPhrase"
            errorText="Nickname is required and should have at least 2 symbols"
            sx={{ flex: '50%' }}
          />
          <FormInput 
            control={control}
            label="Origin description"
            name="originDescription"
            errorText="Nickname is required and should have at least 2 symbols"
            multiline
            sx={{ flex: '100%' }}
          />
          <Button type="submit" variant="contained">Update</Button>
        </Box>
      </Box>
    </Container>
  )
}
