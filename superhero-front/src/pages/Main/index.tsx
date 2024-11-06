import { Box, Container, Pagination, Typography } from "@mui/material";
import { superheroService } from "../../services/superhero.service";
import Card from "../../components/Card";
import { useEffectQuery } from "../../hooks/useEffectQuery";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import usePagination from "./usePagination";
import { useCallback } from "react";

export default function Main() {
  const { page, handlePageChange } = usePagination(1);

  const getAllSuperheroes = useCallback(() => superheroService.getAll(page), [page])

  const { data, loading, error } = useEffectQuery({
    query: getAllSuperheroes,
  });

  return (
    <Container>
      <Typography 
        variant="h5" 
        component="h1" 
        sx={{ fontWeight: 600, mb: 1 }}
      >All superheroes</Typography>
      {loading && <Loader />}
      {error && <Error />}
      {data &&
        <>
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              width: '100%', 
              gap: 2, 
            }}
          >
            {data.data.map(superhero => (
              <Card 
                id={superhero.id} 
                nickname={superhero.nickname} 
                img={superhero.image} 
              />
            ))}
          </Box>
          <Pagination 
            count={data.numberOfPages} 
            page={page} 
            onChange={handlePageChange}
            sx={{ mx: 'auto', mt: 2, width: 'max-content' }}
          />
        </>
      }
    </Container>
  )
}
