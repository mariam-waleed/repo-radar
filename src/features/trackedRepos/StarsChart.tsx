import {
  Card,
  CardContent,
  Typography,
} from '@mui/material'

import { BarChart } from '@mui/x-charts/BarChart'

import type { Repository } from '../../types/repository'

interface StarsChartProps {
  repositories: Repository[]
}

function StarsChart({
  repositories,
}: StarsChartProps) {
  const repositoryNames = repositories.map(
    (repository) => {
      const name = repository.fullName

      return name.length > 20
        ? `${name.slice(0, 20)}...`
        : name
    },
  )

  const starCounts = repositories.map(
    (repository) => repository.stars,
  )

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography
          variant="h6"
          component="h3"
          sx={{ mb: 2 }}
        >
          Stars per Repository
        </Typography>

        <BarChart
          xAxis={[
            {
              scaleType: 'band',
              data: repositoryNames,
            },
          ]}
          series={[
            {
              data: starCounts,
              label: 'Stars',
            },
          ]}
          height={350}
        />
      </CardContent>
    </Card>
  )
}

export default StarsChart