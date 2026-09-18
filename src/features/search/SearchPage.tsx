import {
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'

import RepositoryCard from '../../components/RepositoryCard'
import { mockRepositories } from '../../data/mockRepositories'

function SearchPage() {
  return (
    <Stack spacing={3}>
      <div>
        <Typography
          variant="h4"
          component="h2"
        >
          Search Repositories
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Search GitHub and track repositories you want to monitor.
        </Typography>
      </div>

      <TextField
        fullWidth
        placeholder="Search GitHub repositories..."
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />

      <Typography
        variant="h6"
        component="h3"
      >
        Search Results
      </Typography>

      <Stack spacing={2}>
        {mockRepositories.map((repository) => (
          <RepositoryCard
            key={repository.id}
            repository={repository}
          />
        ))}
      </Stack>
    </Stack>
  )
}

export default SearchPage