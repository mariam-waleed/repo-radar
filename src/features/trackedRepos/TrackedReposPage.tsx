import {
  Alert,
  Button,
  Stack,
  Typography,
} from '@mui/material'

import RefreshIcon from '@mui/icons-material/Refresh'

import RepositoryCard from '../../components/RepositoryCard'

import {
  useAppDispatch,
  useAppSelector,
} from '../../app/hooks'

import {
  untrackRepository,
} from './trackedReposSlice'

function TrackedReposPage() {
  const dispatch = useAppDispatch()

  const trackedRepositories = useAppSelector(
    (state) => state.trackedRepos.items,
  )

  return (
    <Stack spacing={3}>
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        sx= {{justifyContent:"space-between", alignItems: {
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
          disabled
        >
          Refresh All
        </Button>
      </Stack>

      {trackedRepositories.length === 0 ? (
        <Alert severity="info">
          You aren't tracking any repositories yet.
        </Alert>
      ) : (
        <Stack spacing={2}>
          {trackedRepositories.map((repository) => (
            <RepositoryCard
              key={repository.id}
              repository={repository}
              isTracked
              onTrackToggle={() => {
                dispatch(
                  untrackRepository(repository.id),
                )
              }}
            />
          ))}
        </Stack>
      )}
    </Stack>
  )
}

export default TrackedReposPage