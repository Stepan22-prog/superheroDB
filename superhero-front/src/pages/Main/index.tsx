import { Box, Container, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { superheroService } from "../../services/superhero.service";
import { AllSuperheroesResponseType } from "../../types/superhero.type";
import Card from "../../components/Card";

export default function Main() {
  const [page, setPage] = useState<number>(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const [superheroes, setSuperheroes] = useState<null | AllSuperheroesResponseType>(null);
  useEffect(() => {
    async function getData() {
      const response = await superheroService.getAll(page);
      setSuperheroes(response);
    }
    getData();
  }, [page]);

  return (
    <Container>
      <Typography>All superheroes</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', gap: 1, }}>{superheroes && superheroes.data.map(superhero => (
        <Card id={superhero.id} nickname={superhero.nickname} img={superhero.image} />
      )) }</Box>
      {superheroes && <Pagination count={superheroes.numberOfPages} page={page} onChange={handleChange} />}
    </Container>
  )
}
