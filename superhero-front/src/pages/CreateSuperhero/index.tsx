import { Box, Button, Container, IconButton } from "@mui/material";
import FormInput from "../../components/Inputs/FormInput";
import { useForm } from "react-hook-form";
import ImageUpload from "../../components/ImageUpload";
import { useState } from "react";
import { CreateSuperheroType } from "../../types/superhero.type";
import { superheroService } from "../../services/superhero.service";
import DeleteIcon from '@mui/icons-material/Delete';

export default function CreateSuperhero() {
  const { control, handleSubmit } = useForm<CreateSuperheroType>();
  const [images, setImages] = useState<[] | Array<{ preview: string, image: Blob }>>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setImages(pervImages => [...pervImages, { preview: URL.createObjectURL(e.target.files[0]), image: e.target.files[0] }]);
  } 

  function handleDelete(imageLink:string) {
    setImages(images => images.filter((image) => image.preview !== imageLink))
  }

  async function sendData(data: CreateSuperheroType) {
    superheroService.create(data, images);
  }

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit(sendData)} mt={2}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {images.length > 0 && images.map((image) => (
            <Box width="200px" height="250px" position="relative">
              <IconButton 
                color="error"
                onClick={() => handleDelete(image.preview)}
                sx={{
                  borderRadius: '50%',  
                  position: 'absolute',
                  top: '3px',
                  right: '5px'
                }}
              >
                <DeleteIcon />
              </IconButton>
              <img src={image.preview} />
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
          <Button type="submit" variant="contained">Create</Button>
        </Box>
      </Box>
    </Container>
  )
}
