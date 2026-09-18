import {
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'

import type { Repository } from '../../types/repository'

interface TrackedReposState {
  items: Repository[]
}

const initialState: TrackedReposState = {
  items: [],
}

const trackedReposSlice = createSlice({
  name: 'trackedRepos',

  initialState,

  reducers: {
    trackRepository(
      state,
      action: PayloadAction<Repository>,
    ) {
      const alreadyTracked = state.items.some(
        (repository) =>
          repository.id === action.payload.id,
      )

      if (!alreadyTracked) {
        state.items.push(action.payload)
      }
    },

    untrackRepository(
      state,
      action: PayloadAction<number>,
    ) {
      state.items = state.items.filter(
        (repository) =>
          repository.id !== action.payload,
      )
    },
  },
})

export const {
  trackRepository,
  untrackRepository,
} = trackedReposSlice.actions

export default trackedReposSlice.reducer