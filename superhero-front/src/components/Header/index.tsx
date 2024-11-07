import { Box, Button, Divider, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import Search from "../Search";

export default function Header() {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: 1.5,
          maxWidth: '90%',
          mx: 'auto',
        }}
      >
        <Typography
          to="/"
          component={Link}
          variant="h6" 
          sx={{ 
            textTransform: 'uppercase', 
            color: 'inherit', 
            textDecoration: 'none' 
          }}
        >
          Superhero
        </Typography>
        <Search />
        <Button 
          to="/superhero/create" 
          component={Link} 
          variant="contained" 
          startIcon={<AddIcon />}
        >
          superhero
        </Button>
      </Box>
      <Divider />
    </Box>
  )
}
