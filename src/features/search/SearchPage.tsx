import {
  useEffect,
  useState,
} from 'react'

import type { ChangeEvent } from 'react'

import {
  Alert,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'

import RepositoryCard from '../../components/RepositoryCard'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { searchRepositories } from '../../services/githubApi'

import {
  useAppDispatch,
  useAppSelector,
} from '../../app/hooks'

import {
  trackRepository,
  untrackRepository,
} from '../trackedRepos/trackedReposSlice'

import type { Repository } from '../../types/repository'

function SearchPage() {
  const dispatch = useAppDispatch()

  const trackedRepositories = useAppSelector(
    (state) => state.trackedRepos.items,
  )

  const [query, setQuery] = useState('')

  const [repositories, setRepositories] =
    useState<Repository[]>([])

  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] =
    useState<string | null>(null)

  const debouncedQuery = useDebouncedValue(query, 500)

  useEffect(() => {
    const trimmedQuery = query.trim()
    const trimmedDebouncedQuery = debouncedQuery.trim()

    // Do not search if:
    // 1. Input is empty
    // 2. Debounce has not caught up with the current query yet
    if (
      !trimmedQuery ||
      trimmedQuery !== trimmedDebouncedQuery
    ) {
      return
    }

    const controller = new AbortController()

    async function loadRepositories() {
      try {
        const results = await searchRepositories(
          trimmedDebouncedQuery,
          controller.signal,
        )

        if (!controller.signal.aborted) {
          setRepositories(results)
          setError(null)
        }
      } catch (error: unknown) {
        if (
          error instanceof DOMException &&
          error.name === 'AbortError'
        ) {
          return
        }

        setError(
          error instanceof Error
            ? error.message
            : 'Something went wrong while searching GitHub.',
        )
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadRepositories()

    return () => {
      controller.abort()
    }
  }, [query, debouncedQuery])

  function handleQueryChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const value = event.target.value

    setQuery(value)

    // Remove previous results immediately when
    // the user changes or deletes the query.
    setRepositories([])
    setError(null)

    if (!value.trim()) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
  }

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
        value={query}
        onChange={handleQueryChange}
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

      {isLoading && (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
          }}
        >
          <CircularProgress size={20} />

          <Typography variant="body2">
            Searching GitHub...
          </Typography>
        </Stack>
      )}

      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}

      {!isLoading &&
        !error &&
        query.trim().length > 0 &&
        repositories.length === 0 && (
          <Alert severity="info">
            No repositories found.
          </Alert>
        )}

      {!isLoading &&
        query.trim().length > 0 &&
        repositories.length > 0 && (
          <>
            <Typography
              variant="h6"
              component="h3"
            >
              Search Results
            </Typography>

            <Stack spacing={2}>
              {repositories.map((repository) => {
                const isTracked =
                  trackedRepositories.some(
                    (trackedRepository) =>
                      trackedRepository.id === repository.id,
                  )

                return (
                  <RepositoryCard
                    key={repository.id}
                    repository={repository}
                    isTracked={isTracked}
                    onTrackToggle={() => {
                      if (isTracked) {
                        dispatch(
                          untrackRepository(repository.id),
                        )
                      } else {
                        dispatch(
                          trackRepository(repository),
                        )
                      }
                    }}
                  />
                )
              })}
            </Stack>
          </>
        )}
    </Stack>
  )
}

export default SearchPage