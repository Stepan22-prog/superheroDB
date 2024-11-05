import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { superheroService } from "../../services/superhero.service";
import { AllSuperheroesResponseType } from "../../types/superhero.type";
import Card from "../../components/Card";

export default function Main() {
  const [superheroes, setSuperheroes] = useState<null | AllSuperheroesResponseType>(null);
  useEffect(() => {
    async function getData() {
      const response = await superheroService.getAll(1);
      setSuperheroes(response);
    }
    getData();
  }, []);

  return (
    <Container>
      <Typography>All superheroes</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', gap: 1, }}>{superheroes && superheroes.data.map(superhero => (
        <Card id={superhero.id} nickname={superhero.nickname} img={superhero.image} />
      )) }</Box>
    </Container>
  )
}
