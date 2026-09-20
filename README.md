# Repo Radar

Repo Radar is a React + TypeScript app for searching GitHub repositories, tracking selected repositories, and monitoring their latest statistics.

## Live Demo

https://repo-radar-beryl.vercel.app/

## Required Features

- Debounced GitHub repository search
- Track and untrack repositories
- Tracked repositories view
- Display stars, open issues, and latest commit date
- Refresh individual repositories or all repositories
- Independent loading and error states per repository
- Persist tracked repositories using `localStorage`
- Typed API and application models using TypeScript
- Bar chart showing stars per tracked repository

## Added Enhancements

- Paginated GitHub search results
- Sort tracked repositories by name, stars, open issues, or latest commit
- Additional Open Issues chart
- Light and dark theme with persisted preference
- Tracked repository count in the header
- Lazy loading of the tracked repositories page

## Tech Stack

React, TypeScript, Vite, Redux Toolkit, Material UI, MUI X Charts, GitHub REST API, and Vercel.

## Setup

```bash
npm install
npm run dev
```

Other useful commands:

```bash
npm run build
npm run lint
```

## Architecture and Technical Decisions

- **State:** Search and sorting state are kept locally where they are used, while shared tracked-repository state is managed with Redux Toolkit.
- **Data layer:** GitHub API calls are isolated in a service layer and mapped to the app's own `Repository` model.
- **Async operations:** Search uses debounce and request cancellation. Repository refreshes have independent loading and error states.
- **Persistence:** Tracked repositories and theme preference are stored in `localStorage`.
- **Performance:** The tracked repositories page is lazy-loaded because it includes the chart components.

## Assumptions and Limitations

- The app uses the unauthenticated GitHub REST API, so rate limits apply.
- GitHub API rate limits may temporarily affect search, pagination, and repository refresh requests.
- GitHub Search exposes up to the first 1,000 results for a query. With 10 results per page, pagination is capped at 100 pages.
- Data is stored only in the current browser; there is no backend or user account system.