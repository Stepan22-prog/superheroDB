import { Box, Button, Typography } from "@mui/material";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <Typography variant="h4" component="h1">Oops! Error has occurred!</Typography>
      <Typography variant="h5" sx={{ my: 2 }}>{error.statusText || error.message}</Typography>
      <Button 
        to="/"
        component={Link}
        variant="contained"
      >
        Go to the main page
      </Button>
    </Box>
  )
}
