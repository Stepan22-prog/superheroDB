import { Box, Button, Divider, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function Header() {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: 1,
          maxWidth: '90%',
          mx: 'auto',
        }}
      >
        <Typography variant="h6" sx={{ textTransform: 'uppercase' }}>Superhero</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          superhero
        </Button>
      </Box>
      <Divider />
    </Box>
  )
}
