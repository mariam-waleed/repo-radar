import {
  useEffect,
  useState,
} from 'react'

import type { ChangeEvent } from 'react'

import {
  Alert,
  CircularProgress,
  InputAdornment,
  Pagination,
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
  refreshTrackedRepository,
  trackRepository,
  untrackRepository,
} from '../trackedRepos/trackedReposSlice'

import type { Repository } from '../../types/repository'

const PAGE_SIZE = 10

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

  const [page, setPage] = useState(1)

  const [totalCount, setTotalCount] =
    useState(0)

  const debouncedQuery = useDebouncedValue(query, 500)

  const totalPages = Math.min(
    Math.ceil(totalCount / PAGE_SIZE),
    100,
  )

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
      setIsLoading(true)

      try {
        const result = await searchRepositories(
          trimmedDebouncedQuery,
          page,
          controller.signal,
        )

        if (!controller.signal.aborted) {
          setRepositories(result.repositories)
          setTotalCount(result.totalCount)
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
  }, [query, debouncedQuery, page])

  function handleQueryChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const value = event.target.value

    setQuery(value)

    // A new search should always start from page 1.
    setPage(1)
    setTotalCount(0)

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

  function handleTrackRepository(repository: Repository) {
    dispatch(trackRepository(repository))
    void dispatch(refreshTrackedRepository(repository))
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
        !error &&
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
                        handleTrackRepository(repository)
                      }
                    }}
                  />
                )
              })}
            </Stack>

            {totalPages > 1 && (
              <Stack
                sx={{
                  alignItems: 'center',
                  pt: 2,
                }}
              >
                <Pagination
                  count={totalPages}
                  page={page}
                  color="primary"
                  onChange={(_, newPage) => {
                    setPage(newPage)
                  }}
                />
              </Stack>
            )}
          </>
        )}
    </Stack>
  )
}

export default SearchPage