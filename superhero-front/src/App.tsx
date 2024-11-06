import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Box } from "@mui/material"

function App() {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
     <Header />
     <Box sx={{ flex: 'auto' }}>
      <Outlet />
     </Box>
     <Footer />
    </Box>
  )
}

export default App
