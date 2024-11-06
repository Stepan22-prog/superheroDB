import { Typography } from '@mui/material'

type PageTitleProps = {
  children: React.ReactNode;
}

export default function PageTitle({ children }: PageTitleProps) {
  return (
    <Typography 
      variant="h5" 
      component="h1" 
      sx={{ fontWeight: 600, mb: 1 }}
    >
      {children}
    </Typography>
  )
}
