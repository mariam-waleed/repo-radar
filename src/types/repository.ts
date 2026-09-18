export interface Repository {
  id: number
  name: string
  fullName: string
  owner: string
  description: string | null
  stars: number
  openIssues: number
  language: string | null
  htmlUrl: string
  lastCommitDate: string | null
}