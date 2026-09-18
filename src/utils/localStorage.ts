import type { Repository } from '../types/repository'

const TRACKED_REPOS_KEY =
  'repo-radar-tracked-repositories'

export function loadTrackedRepositories(): Repository[] {
  try {
    const savedRepositories =
      localStorage.getItem(TRACKED_REPOS_KEY)

    if (!savedRepositories) {
      return []
    }

    return JSON.parse(savedRepositories) as Repository[]
  } catch {
    return []
  }
}

export function saveTrackedRepositories(
  repositories: Repository[],
) {
  localStorage.setItem(
    TRACKED_REPOS_KEY,
    JSON.stringify(repositories),
  )
}