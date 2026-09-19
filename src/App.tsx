import {
  lazy,
  Suspense,
  useState,
} from 'react'

import {
  CircularProgress,
  Container,
  Stack,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material'

import type { PaletteMode } from '@mui/material'
import Header, {
  type AppView,
} from './components/Header'

import SearchPage from './features/search/SearchPage'
import { useAppSelector } from './app/hooks'
const TrackedReposPage = lazy(
  () => import('./features/trackedRepos/TrackedReposPage'),
)
const THEME_KEY = 'repo-radar-theme'
function App() {
  const [currentView, setCurrentView] =
    useState<AppView>('search')
    const [mode, setMode] =
    useState<PaletteMode>(() => {
      const savedMode =
        localStorage.getItem(THEME_KEY)

      return savedMode === 'dark'
        ? 'dark'
        : 'light'
    })

  const trackedCount = useAppSelector(
    (state) => state.trackedRepos.items.length,
  )

  const theme = createTheme({
    palette: {
      mode,
    },
  })

  function handleToggleTheme() {
    const newMode: PaletteMode =
      mode === 'light'
        ? 'dark'
        : 'light'

    setMode(newMode)

    localStorage.setItem(
      THEME_KEY,
      newMode,
    )
  }
  return (
       <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        mode={mode}
        onToggleTheme={handleToggleTheme}
        trackedCount={trackedCount}
      />

      <Container
        maxWidth="lg"
        sx={{ py: 4 }}
      >
        {currentView === 'search' ? (
          <SearchPage />
        ) : (
          <Suspense
            fallback={
              <Stack
                sx={{
                  alignItems: 'center',
                  py: 8,
                }}
              >
                <CircularProgress />
              </Stack>
            }
          >
            <TrackedReposPage />
          </Suspense>
        )}
      </Container>
     </ThemeProvider>
  )
}

export default App