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

    const repositories =
      JSON.parse(savedRepositories) as Repository[]

    return repositories.map((repository) => ({
      ...repository,
      lastCommitDate:
        repository.lastCommitDate ?? null,
    }))
  } catch {
    return []
  }
}

export function saveTrackedRepositories(
  repositories: Repository[],
) {
  try {
    localStorage.setItem(
      TRACKED_REPOS_KEY,
      JSON.stringify(repositories),
    )
  } catch {
    // Storage can be unavailable or full; in-memory state remains valid.
  }
}