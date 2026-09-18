import type {
  GitHubRepository,
  GitHubSearchResponse,
} from '../types/github'

import type { Repository } from '../types/repository'

const GITHUB_API_URL = 'https://api.github.com'

function mapGitHubRepository(
  repository: GitHubRepository,
): Repository {
  return {
    id: repository.id,
    name: repository.name,
    fullName: repository.full_name,
    owner: repository.owner.login,
    description: repository.description,
    stars: repository.stargazers_count,
    openIssues: repository.open_issues_count,
    language: repository.language,
    htmlUrl: repository.html_url,
  }
}

export async function searchRepositories(
  query: string,
  signal?: AbortSignal,
): Promise<Repository[]> {
  const response = await fetch(
    `${GITHUB_API_URL}/search/repositories?q=${encodeURIComponent(query)}&per_page=10`,
    {
      signal,
      headers: {
        Accept: 'application/vnd.github+json',
      },
    },
  )

  if (!response.ok) {
    throw new Error(
      `GitHub request failed with status ${response.status}`,
    )
  }

  const data =
    (await response.json()) as GitHubSearchResponse

  return data.items.map(mapGitHubRepository)
}