import {
  Alert,
  Button,
  Stack,
  Typography,
} from '@mui/material'

import RefreshIcon from '@mui/icons-material/Refresh'

function TrackedReposPage() {
  return (
    <Stack spacing={3}>
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        sx={{justifyContent:"space-between", alignItems: {
          xs: 'flex-start',
          sm: 'center',
        }}}
        spacing={2}
      >
        <div>
          <Typography
            variant="h4"
            component="h2"
          >
            Tracked Repositories
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Monitor the latest statistics of your repositories.
          </Typography>
        </div>

        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
        >
          Refresh All
        </Button>
      </Stack>

      <Alert severity="info">
        You aren't tracking any repositories yet.
      </Alert>
    </Stack>
  )
}

export default TrackedReposPage