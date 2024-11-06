import { Container } from "@mui/material";
import { SuperheroType } from "../../types/superhero.type";
import { superheroService } from "../../services/superhero.service";
import useImage from "./useImage";
import { useSuperheroMutate } from "../../hooks/useSuperheroMutate";
import ManageSuperhero from "../../components/ManageSuperhero";
import PageTitle from "../../components/PageTitle";

export default function CreateSuperhero() {
  const { images, handleAdd, handleDelete } = useImage();
  const { sendData, isPending, error } = useSuperheroMutate<string>();

  const onSubmit = (data: SuperheroType) => sendData(() => superheroService.create(data, images));

  return (
    <Container maxWidth="md">
      <PageTitle>Create superhero</PageTitle>
      <ManageSuperhero
        images={images}
        handleAdd={handleAdd}
        handleDelete={(image) => handleDelete(image.url)}
        isPending={isPending}
        error={error}
        onSubmit={onSubmit}
      />
    </Container>
  )
}
