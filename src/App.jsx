import Box from '@mui/material/Box';
import Navbar from './components/Navbar'
import DataTable from './components/DataTable'


function App({ children }) {

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
      <Navbar children={<DataTable />} />
      <Box
        component="main"
        sx={{
          p: 3,
          width: "100%",
          height: "70%",
          marginTop: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default App
