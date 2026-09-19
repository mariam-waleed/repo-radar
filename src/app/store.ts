import { configureStore } from '@reduxjs/toolkit'

import trackedReposReducer, {
  initialState as trackedReposInitialState,
} from '../features/trackedRepos/trackedReposSlice'

import {
  loadTrackedRepositories,
  saveTrackedRepositories,
} from '../utils/localStorage'

export const store = configureStore({
  reducer: {
    trackedRepos: trackedReposReducer,
  },

  preloadedState: {
    trackedRepos: {
      ...trackedReposInitialState,
      items: loadTrackedRepositories(),
    },
  },
})

store.subscribe(() => {
  const state = store.getState()

  saveTrackedRepositories(
    state.trackedRepos.items,
  )
})

export type RootState =
  ReturnType<typeof store.getState>

export type AppDispatch =
  typeof store.dispatch