import { Box, Button, Container, Typography } from "@mui/material";
import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { superheroService } from "../../services/superhero.service";
import { Carousel } from "react-responsive-carousel";
import { useEffectQuery } from "../../hooks/useEffectQuery";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useDeleteSuperhero } from "../../hooks/useDeleteSuperhero";
import Notification from "../../components/Notification";

export default function SuperheroDetails() {
  const { superheroId } = useParams();

  const getSuperheroData = useCallback(() => superheroService.get(superheroId  as string), [superheroId])
  const { data: superheroData, loading, error } = useEffectQuery({
    query: getSuperheroData,
  });

  const { isPending, isError, handleDelete } = useDeleteSuperhero(superheroId as string);

  return (
    <Container sx={{ display: 'flex', mt: 2, gap: '20px'}}>
      {loading && <Loader />}
      {error && <Error />}
      {superheroData && 
        <>
          <Box>
            <Carousel width={400} thumbWidth={50}>
              {superheroData.images.map((image) => (
                <img 
                  key={image.id} 
                  src={image.url} 
                  alt="#" 
                  style={{ maxHeight: '400px' }} 
                />
              ))}
            </Carousel>
          </Box>
          <Box>
            <Typography variant="h6"><b>Nickname:</b> {superheroData.nickname}</Typography>
            <Typography variant="subtitle1"><b>Real name:</b> {superheroData.realName}</Typography>
            <Typography variant="subtitle1"><b>Origin description:</b> {superheroData.originDescription}</Typography>
            <Typography variant="subtitle1"><b>Superpowers:</b> {superheroData.superpowers}</Typography>
            <Typography variant="subtitle1"><b>Catch phrase:</b> {superheroData.catchPhrase}</Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Button 
                to={`/superhero/edit/${superheroId}`} 
                component={Link} 
                variant="contained"
              >
                Edit
              </Button>
              <Button 
                variant="outlined" 
                color="error" 
                disabled={isPending}
                onClick={handleDelete}
              >
                {isPending ? 'Deleting...' : 'Delete' }
              </Button>
            </Box>
          </Box>
        </>
      }
      <Notification
        isOpen={isError}
        text="An error occurred while deleting"
        type="error"
      />
    </Container>
  )
}
