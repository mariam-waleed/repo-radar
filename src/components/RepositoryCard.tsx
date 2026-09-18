import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material'

import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined'
import BookmarkRemoveOutlinedIcon from '@mui/icons-material/BookmarkRemoveOutlined'
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined'
import RefreshIcon from '@mui/icons-material/Refresh'
import StarOutlineIcon from '@mui/icons-material/StarOutlined'

import type { Repository } from '../types/repository'

interface RepositoryCardProps {
  repository: Repository
  isTracked: boolean
  onTrackToggle: () => void

  onRefresh?: () => void
  isRefreshing?: boolean
  refreshError?: string | null
}

function RepositoryCard({
  repository,
  isTracked,
  onTrackToggle,
  onRefresh,
  isRefreshing = false,
  refreshError = null,
}: RepositoryCardProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <div>
            <Typography
              variant="h6"
              component="h3"
            >
              {repository.fullName}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {repository.description ??
                'No description available'}
            </Typography>
          </div>

          <Stack
            direction="row"
            spacing={2}
            useFlexGap
            sx={{
              alignItems: 'center',
              flexWrap: "wrap"
            }}
          >
            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                alignItems: 'center',
              }}
            >
              <StarOutlineIcon fontSize="small" />

              <Typography variant="body2">
                {repository.stars.toLocaleString()}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                alignItems: 'center',
              }}
            >
              <BugReportOutlinedIcon fontSize="small" />

              <Typography variant="body2">
                {repository.openIssues.toLocaleString()} issues
              </Typography>
            </Stack>

            {repository.language && (
              <Chip
                label={repository.language}
                size="small"
                variant="outlined"
              />
            )}
          </Stack>

          {onRefresh && (
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Last commit:{' '}
              {repository.lastCommitDate
                ? new Date(
                    repository.lastCommitDate,
                  ).toLocaleString()
                : 'Not loaded yet'}
            </Typography>
          )}

          {refreshError && (
            <AlertMessage message={refreshError} />
          )}
        </Stack>
      </CardContent>

      <CardActions>
        {onRefresh && (
          <Button
            size="small"
            onClick={onRefresh}
            disabled={isRefreshing}
            startIcon={
              isRefreshing ? (
                <CircularProgress size={16} />
              ) : (
                <RefreshIcon />
              )
            }
          >
            {isRefreshing
              ? 'Refreshing'
              : 'Refresh'}
          </Button>
        )}

        <Button
          size="small"
          onClick={onTrackToggle}
          startIcon={
            isTracked ? (
              <BookmarkRemoveOutlinedIcon />
            ) : (
              <BookmarkAddOutlinedIcon />
            )
          }
        >
          {isTracked ? 'Untrack' : 'Track'}
        </Button>

        <Button
          href={repository.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          size="small"
        >
          View on GitHub
        </Button>
      </CardActions>
    </Card>
  )
}

interface AlertMessageProps {
  message: string
}

function AlertMessage({
  message,
}: AlertMessageProps) {
  return (
    <Typography
      variant="body2"
      color="error"
    >
      {message}
    </Typography>
  )
}

export default RepositoryCard