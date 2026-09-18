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

import type { Repository } from '../../types/repository'

function SearchPage() {
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

    if (!value.trim()) {
      setRepositories([])
      setError(null)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)
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
          alignItems="center"
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
        query.trim() &&
        repositories.length === 0 && (
          <Alert severity="info">
            No repositories found.
          </Alert>
        )}

      {query.trim() && repositories.length > 0 && (
        <>
          <Typography
            variant="h6"
            component="h3"
          >
            Search Results
          </Typography>

          <Stack spacing={2}>
            {repositories.map((repository) => (
              <RepositoryCard
                key={repository.id}
                repository={repository}
              />
            ))}
          </Stack>
        </>
      )}
    </Stack>
  )
}

export default SearchPage