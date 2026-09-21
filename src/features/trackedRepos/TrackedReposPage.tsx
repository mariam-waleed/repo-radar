import { useState } from 'react'

import StarsChart from './StarsChart'
import IssuesChart from './IssuesChart'

import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'

import RefreshIcon from '@mui/icons-material/Refresh'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
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

type SortOption =
  | 'name'
  | 'stars'
  | 'issues'
  | 'commit'

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

  const [sortBy, setSortBy] =
    useState<SortOption>('name')
   const [showCharts, setShowCharts] =
    useState(true)  

  function handleRefreshRepository(repository: Repository) {
    void dispatch(refreshTrackedRepository(repository))
  }

  function handleRefreshAll() {
    trackedRepositories.forEach((repository) => {
      void dispatch(refreshTrackedRepository(repository))
    })
  }

    function handleUntrackAll() {
    trackedRepositories.forEach((repository) => {
      dispatch(untrackRepository(repository.id))
    })
  }

  const isAnyRepositoryRefreshing =
    Object.values(refreshingById).some(
      (isRefreshing) => isRefreshing,
    )

  const sortedRepositories = [
    ...trackedRepositories,
  ].sort((a, b) => {
    switch (sortBy) {
      case 'stars':
        return b.stars - a.stars

      case 'issues':
        return b.openIssues - a.openIssues

      case 'commit': {
        const aDate = a.lastCommitDate
          ? new Date(a.lastCommitDate).getTime()
          : 0

        const bDate = b.lastCommitDate
          ? new Date(b.lastCommitDate).getTime()
          : 0

        return bDate - aDate
      }

      case 'name':
      default:
        return a.fullName.localeCompare(
          b.fullName,
        )
    }
  })

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

        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          spacing={1}
          sx={{
            width: {
              xs: '100%',
              sm: 'auto',
            },
          }}
        >
          <FormControl
            size="small"
            disabled={trackedRepositories.length === 0}
            sx={{
              minWidth: 190,
            }}
          >
            <InputLabel id="sort-repositories-label">
              Sort by
            </InputLabel>

            <Select
              labelId="sort-repositories-label"
              value={sortBy}
              label="Sort by"
              onChange={(event) => {
                setSortBy(
                  event.target.value as SortOption,
                )
              }}
            >
              <MenuItem value="name">
                Name (A-Z)
              </MenuItem>

              <MenuItem value="stars">
                Stars (High to Low)
              </MenuItem>

              <MenuItem value="issues">
                Open Issues (High to Low)
              </MenuItem>

              <MenuItem value="commit">
                Latest Commit
              </MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            color="error"
            onClick={handleUntrackAll}
            disabled={trackedRepositories.length === 0}
            startIcon={<DeleteSweepIcon />}
          >
            Untrack All
          </Button>
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
      </Stack>

      {trackedRepositories.length === 0 ? (
        <Alert severity="info">
          You aren't tracking any repositories yet.
       </Alert>
      ) : (
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="flex-end"
          >
            <Button
              variant="outlined"
              onClick={() => {
                setShowCharts((current) => !current)
              }}
            >
              {showCharts ? 'Hide Charts' : 'Show Charts'}
            </Button>
          </Stack>

          {isAnyRepositoryRefreshing && (
            <LinearProgress />
          )}

          {showCharts && (
            <>
              <StarsChart
                repositories={sortedRepositories}
              />

              <IssuesChart
                repositories={sortedRepositories}
              />
            </>
          )}

          <Stack spacing={2}>
            {sortedRepositories.map((repository) => (
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