import {
  AppBar,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'

import RadarIcon from '@mui/icons-material/Radar'

export type AppView = 'search' | 'tracked'

interface HeaderProps {
  currentView: AppView
  onViewChange: (view: AppView) => void
}

function Header({
  currentView,
  onViewChange,
}: HeaderProps) {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Stack
            direction="row"
            spacing={1}
            sx={{ flexGrow: 1, alignItems: 'center' }}
          >
            <RadarIcon />

            <Typography
              variant="h6"
              component="h1"
              sx={{ fontWeight: 700 }}
            >
              Repo Radar
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
          >
            <Button
              color="inherit"
              variant={
                currentView === 'search'
                  ? 'outlined'
                  : 'text'
              }
              onClick={() => onViewChange('search')}
            >
              Search
            </Button>

            <Button
              color="inherit"
              variant={
                currentView === 'tracked'
                  ? 'outlined'
                  : 'text'
              }
              onClick={() => onViewChange('tracked')}
            >
              Tracked Repos
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header