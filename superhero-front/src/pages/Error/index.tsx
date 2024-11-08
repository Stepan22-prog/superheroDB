import { Box, Button, Typography } from "@mui/material";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  const errorMessage = isRouteErrorResponse(error)
    ? error.statusText
    : (error as Error)?.message || "An unexpected error occurred";

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <Typography variant="h4" component="h1">Oops! Error has occurred!</Typography>
      <Typography variant="h5" sx={{ my: 2 }}>{errorMessage}</Typography>
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
