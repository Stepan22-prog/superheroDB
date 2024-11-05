import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { superheroService } from "../../services/superhero.service";
import { SuperheroDetailsResponseType } from "../../types/superhero.type";
import { Carousel } from "react-responsive-carousel";

import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function SuperheroDetails() {
  const { superheroId } = useParams();

  const [superheroData, setSuperheroData] = useState<null | SuperheroDetailsResponseType>(null);
  useEffect(() => {
    async function getData() {
      const response = await superheroService.get(superheroId as string);
      setSuperheroData(response);
    }
    getData();
  }, [superheroId]);

  return (
    <Container sx={{ display: 'flex', mt: 2, gap: '20px'}}>
      <Box>
        {superheroData && (
          <Carousel width={400} thumbWidth={50}>
            {superheroData.images.map((image) => (<img src={image} alt="#" style={{ maxHeight: '400px' }} />))}
          </Carousel>
        )}
      </Box>
      {superheroData && 
        <Box>
          <Typography variant="h6"><b>Nickname:</b> {superheroData.nickname}</Typography>
          <Typography variant="subtitle1"><b>Real name:</b> {superheroData.realName}</Typography>
          <Typography variant="subtitle1"><b>Description:</b> {superheroData.originDescription}</Typography>
          <Typography variant="subtitle1"><b>Superpowers:</b> {superheroData.superpowers}</Typography>
          <Typography variant="subtitle1"><b>Catch phrase:</b> {superheroData.catchPhrase}</Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Button variant="contained">Edit</Button>
            <Button variant="outlined" color="error">Delete</Button>
          </Box>
        </Box>
      }
    </Container>
  )
}
