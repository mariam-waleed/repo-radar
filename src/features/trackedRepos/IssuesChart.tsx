import {
  Card,
  CardContent,
  Typography,
} from '@mui/material'

import { BarChart } from '@mui/x-charts/BarChart'

import type { Repository } from '../../types/repository'

interface IssuesChartProps {
  repositories: Repository[]
}

function IssuesChart({
  repositories,
}: IssuesChartProps) {
  const repositoryNames = repositories.map(
    (repository) => {
      const name = repository.fullName

      return name.length > 28
        ? `${name.slice(0, 28)}...`
        : name
    },
  )

  const issueCounts = repositories.map(
    (repository) => repository.openIssues,
  )

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography
          variant="h6"
          component="h3"
          sx={{ mb: 2 }}
        >
          Open Issues per Repository
        </Typography>

        <BarChart
          layout="horizontal"
          yAxis={[
            {
              scaleType: 'band',
              data: repositoryNames,
              width: 220,
              tickLabelStyle: {
                fontSize: 12,
              },
            },
          ]}
          series={[
            {
              data: issueCounts,
              label: 'Open Issues',
            },
          ]}
          height={Math.max(
            300,
            repositories.length * 55,
          )}
        />
      </CardContent>
    </Card>
  )
}

export default IssuesChart