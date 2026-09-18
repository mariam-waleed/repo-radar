import type {
  GitHubCommit,
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
    lastCommitDate: null,
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

async function getRepository(
  owner: string,
  name: string,
): Promise<Repository> {
  const response = await fetch(
    `${GITHUB_API_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(name)}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    },
  )

  if (!response.ok) {
    throw new Error(
      `Failed to refresh repository. Status: ${response.status}`,
    )
  }

  const repository =
    (await response.json()) as GitHubRepository

  return mapGitHubRepository(repository)
}

async function getLatestCommitDate(
  owner: string,
  name: string,
): Promise<string | null> {
  const response = await fetch(
    `${GITHUB_API_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(name)}/commits?per_page=1`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    },
  )

  // Empty repositories can return 409.
  if (response.status === 409) {
    return null
  }

  if (!response.ok) {
    throw new Error(
      `Failed to load latest commit. Status: ${response.status}`,
    )
  }

  const commits =
    (await response.json()) as GitHubCommit[]

  return commits[0]?.commit.committer?.date ?? null
}

export async function refreshRepository(
  owner: string,
  name: string,
): Promise<Repository> {
  const [repository, lastCommitDate] =
    await Promise.all([
      getRepository(owner, name),
      getLatestCommitDate(owner, name),
    ])

  return {
    ...repository,
    lastCommitDate,
  }
}