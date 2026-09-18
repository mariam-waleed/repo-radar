import { useState } from 'react'

import { Container } from '@mui/material'

import Header, {
  type AppView,
} from './components/Header'

import SearchPage from './features/search/SearchPage'
import TrackedReposPage from './features/trackedRepos/TrackedReposPage'

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
          <TrackedReposPage />
        )}
      </Container>
    </>
  )
}

export default App