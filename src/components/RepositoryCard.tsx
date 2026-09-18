import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material'

import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined'
import BookmarkRemoveOutlinedIcon from '@mui/icons-material/BookmarkRemoveOutlined'
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined'
import StarOutlineIcon from '@mui/icons-material/StarOutlined'

import type { Repository } from '../types/repository'

interface RepositoryCardProps {
  repository: Repository
  isTracked: boolean
  onTrackToggle: () => void
}

function RepositoryCard({
  repository,
  isTracked,
  onTrackToggle,
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
              {repository.description ?? 'No description available'}
            </Typography>
          </div>

          <Stack
            direction="row"
            spacing={2}
           
            sx={{alignItems: "center", flexWrap: "wrap"}}
            useFlexGap
          >
            <Stack
              direction="row"
              spacing={0.5}
              sx={{alignItems: "center"}}
            >
              <StarOutlineIcon fontSize="small" />

              <Typography variant="body2">
                {repository.stars.toLocaleString()}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={0.5}
              sx={{alignItems: "center"}}
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
        </Stack>
      </CardContent>

      <CardActions>
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

export default RepositoryCard