import {
   AppBar,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'

import type { PaletteMode } from '@mui/material'
import RadarIcon from '@mui/icons-material/Radar'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'

export type AppView = 'search' | 'tracked'

interface HeaderProps {
  currentView: AppView
  onViewChange: (view: AppView) => void
  mode: PaletteMode
  onToggleTheme: () => void
  trackedCount: number
}

function Header({
  currentView,
  onViewChange,
  mode,
  onToggleTheme,
  trackedCount,
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
            <IconButton
              color="inherit"
              onClick={onToggleTheme}
              aria-label="toggle theme"
            >
              {mode === 'light' ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header