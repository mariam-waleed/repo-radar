import { Container, Typography } from '@mui/material'

function App() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" component="h1">
        Repo Radar
      </Typography>

      <Typography variant="body1" sx={{ mt: 1 }}>
        Search, track, and monitor GitHub repositories.
      </Typography>
    </Container>
  )
}

export default App