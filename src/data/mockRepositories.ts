import type { Repository } from '../types/repository'

export const mockRepositories: Repository[] = [
  {
    id: 10270250,
    name: 'react',
    fullName: 'facebook/react',
    owner: 'facebook',
    description: 'The library for web and native user interfaces.',
    stars: 240000,
    openIssues: 900,
    language: 'JavaScript',
    htmlUrl: 'https://github.com/facebook/react',
  },
  {
    id: 28457823,
    name: 'freeCodeCamp',
    fullName: 'freeCodeCamp/freeCodeCamp',
    owner: 'freeCodeCamp',
    description: 'The open source codebase and curriculum for freeCodeCamp.',
    stars: 420000,
    openIssues: 200,
    language: 'TypeScript',
    htmlUrl: 'https://github.com/freeCodeCamp/freeCodeCamp',
  },
  {
    id: 70107786,
    name: 'next.js',
    fullName: 'vercel/next.js',
    owner: 'vercel',
    description: 'The React Framework for the Web.',
    stars: 130000,
    openIssues: 2500,
    language: 'JavaScript',
    htmlUrl: 'https://github.com/vercel/next.js',
  },
]