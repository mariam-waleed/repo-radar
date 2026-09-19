import StarsChart from './StarsChart'

import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material'

import RefreshIcon from '@mui/icons-material/Refresh'

import {
  useAppDispatch,
  useAppSelector,
} from '../../app/hooks'

import RepositoryCard from '../../components/RepositoryCard'

import {
  refreshTrackedRepository,
  untrackRepository,
} from './trackedReposSlice'

import type { Repository } from '../../types/repository'

function TrackedReposPage() {
  const dispatch = useAppDispatch()

  const trackedRepositories =
    useAppSelector(
      (state) => state.trackedRepos.items,
    )

  const refreshingById = useAppSelector(
    (state) => state.trackedRepos.refreshingById,
  )

  const errorById = useAppSelector(
    (state) => state.trackedRepos.errorById,
  )

  function handleRefreshRepository(repository: Repository) {
    void dispatch(refreshTrackedRepository(repository))
  }

  function handleRefreshAll() {
    trackedRepositories.forEach((repository) => {
      void dispatch(refreshTrackedRepository(repository))
    })
  }

  const isAnyRepositoryRefreshing =
    Object.values(refreshingById).some(
      (isRefreshing) => isRefreshing,
    )

  return (
    <Stack spacing={3}>
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: {
            xs: 'flex-start',
            sm: 'center',
          },
        }}
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
          onClick={() => {
            void handleRefreshAll()
          }}
          disabled={
            trackedRepositories.length === 0 ||
            isAnyRepositoryRefreshing
          }
          startIcon={
            isAnyRepositoryRefreshing ? (
              <CircularProgress size={16} />
            ) : (
              <RefreshIcon />
            )
          }
        >
          {isAnyRepositoryRefreshing
            ? 'Refreshing All'
            : 'Refresh All'}
        </Button>
      </Stack>

      {trackedRepositories.length === 0 ? (
        <Alert severity="info">
          You aren't tracking any repositories yet.
        </Alert>
      ) : (
        <Stack spacing={3}>
          <StarsChart
            repositories={trackedRepositories}
          />

          <Stack spacing={2}>
            {trackedRepositories.map((repository) => (
              <RepositoryCard
                key={repository.id}
                repository={repository}
                isTracked
                isRefreshing={
                  refreshingById[repository.id] ?? false
                }
                refreshError={
                  errorById[repository.id] ?? null
                }
                onRefresh={() => {
                  handleRefreshRepository(repository)
                }}
                onTrackToggle={() => {
                  dispatch(untrackRepository(repository.id))
                }}
              />
            ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}

export default TrackedReposPage