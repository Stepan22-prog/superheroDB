import FormInput from "../Inputs/FormInput";
import { SuperheroType } from "../../types/superhero.type";
import { Control } from "react-hook-form";

type ManageSuperheroType = {
  control: Control<SuperheroType>
}

export default function SuperheroForm({ control } : ManageSuperheroType) {
  return (
    <>
      <FormInput 
        control={control}
        label="Nickname"
        name="nickname"
        errorText="Nickname is required and must be between 2 and 100 characters long"
        pattern={/^[A-Za-z.,!?]{2,100}$/}
        sx={{ flex: '49%', mr: 1 }}
      />
      <FormInput 
        control={control}
        label="Real name"
        name="realName"
        errorText="Real name is required and must be between 2 and 100 characters long"
        pattern={/^[A-Za-z.,!?]{2,100}$/}
        sx={{ flex: '50%' }}
      />
      <FormInput 
        control={control}
        label="Superpowers"
        name="superpowers"
        errorText="Superpowers are required and must be between 2 and 150 characters long"
        pattern={/^[A-Za-z.,!?]{2,150}$/}
        sx={{ flex: '49%', mr: 1 }}
      />
      <FormInput 
        control={control}
        label="Catch phrase"
        name="catchPhrase"
        errorText="Catch phrase is required and must be between 2 and 150 characters long"
        pattern={/^[A-Za-z.,!?]{2,150}$/}
        sx={{ flex: '50%' }}
      />
      <FormInput 
        control={control}
        label="Origin description"
        name="originDescription"
        errorText="Origin description is required and must be between 2 and 150 characters long"
        pattern={/^[A-Za-z.,!?]{2,150}$/}
        multiline
        sx={{ flex: '100%' }}
      />
    </>
  )
}
