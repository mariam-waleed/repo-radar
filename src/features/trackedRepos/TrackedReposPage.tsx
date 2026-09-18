import { useState } from 'react'

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
  refreshRepository,
} from '../../services/githubApi'

import {
  untrackRepository,
  updateRepository,
} from './trackedReposSlice'

import type { Repository } from '../../types/repository'

function TrackedReposPage() {
  const dispatch = useAppDispatch()

  const trackedRepositories =
    useAppSelector(
      (state) => state.trackedRepos.items,
    )

  const [refreshingById, setRefreshingById] =
    useState<Record<number, boolean>>({})

  const [errorById, setErrorById] =
    useState<Record<number, string | null>>({})

  async function handleRefreshRepository(
    repository: Repository,
  ) {
    setRefreshingById((current) => ({
      ...current,
      [repository.id]: true,
    }))

    setErrorById((current) => ({
      ...current,
      [repository.id]: null,
    }))

    try {
      const updatedRepository =
        await refreshRepository(
          repository.owner,
          repository.name,
        )

      dispatch(
        updateRepository(updatedRepository),
      )
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to refresh repository.'

      setErrorById((current) => ({
        ...current,
        [repository.id]: message,
      }))
    } finally {
      setRefreshingById((current) => ({
        ...current,
        [repository.id]: false,
      }))
    }
  }

  async function handleRefreshAll() {
    await Promise.all(
      trackedRepositories.map(
        (repository) =>
          handleRefreshRepository(repository),
      ),
    )
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
        <Stack spacing={2}>
          {trackedRepositories.map(
            (repository) => (
              <RepositoryCard
                key={repository.id}
                repository={repository}
                isTracked
                isRefreshing={
                  refreshingById[
                    repository.id
                  ] ?? false
                }
                refreshError={
                  errorById[
                    repository.id
                  ] ?? null
                }
                onRefresh={() => {
                  void handleRefreshRepository(
                    repository,
                  )
                }}
                onTrackToggle={() => {
                  dispatch(
                    untrackRepository(
                      repository.id,
                    ),
                  )
                }}
              />
            ),
          )}
        </Stack>
      )}
    </Stack>
  )
}

export default TrackedReposPage