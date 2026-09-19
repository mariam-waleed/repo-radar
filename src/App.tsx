import {
  lazy,
  Suspense,
  useState,
} from 'react'

import {
  CircularProgress,
  Container,
  Stack,
} from '@mui/material'

import Header, {
  type AppView,
} from './components/Header'

import SearchPage from './features/search/SearchPage'

const TrackedReposPage = lazy(
  () => import('./features/trackedRepos/TrackedReposPage'),
)

function App() {
  const [currentView, setCurrentView] =
    useState<AppView>('search')

  return (
    <>
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
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
    </>
  )
}

export default App