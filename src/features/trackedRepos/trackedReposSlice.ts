import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'

import { refreshRepository } from '../../services/githubApi'
import type { Repository } from '../../types/repository'

export interface TrackedReposState {
  items: Repository[]
  refreshingById: Record<number, boolean>
  errorById: Record<number, string | null>
}

export const initialState: TrackedReposState = {
  items: [],
  refreshingById: {},
  errorById: {},
}

export const refreshTrackedRepository = createAsyncThunk<
  Repository,
  Repository,
  { rejectValue: string }
>(
  'trackedRepos/refreshRepository',
  async (repository, { rejectWithValue }) => {
    try {
      return await refreshRepository(
        repository.owner,
        repository.name,
      )
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Failed to refresh repository.',
      )
    }
  },
)

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

  extraReducers: (builder) => {
    builder
      .addCase(
        refreshTrackedRepository.pending,
        (state, action) => {
          const repositoryId = action.meta.arg.id

          state.refreshingById[repositoryId] = true
          state.errorById[repositoryId] = null
        },
      )
      .addCase(
        refreshTrackedRepository.fulfilled,
        (state, action) => {
          const repositoryId = action.payload.id
          const index = state.items.findIndex(
            (repository) => repository.id === repositoryId,
          )

          if (index !== -1) {
            state.items[index] = action.payload
          }

          state.refreshingById[repositoryId] = false
        },
      )
      .addCase(
        refreshTrackedRepository.rejected,
        (state, action) => {
          const repositoryId = action.meta.arg.id

          state.refreshingById[repositoryId] = false
          state.errorById[repositoryId] =
            action.payload ?? 'Failed to refresh repository.'
        },
      )
  },
})

export const {
  trackRepository,
  untrackRepository,
} = trackedReposSlice.actions

export default trackedReposSlice.reducer