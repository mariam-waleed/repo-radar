# Repo Radar

Repo Radar is a React + TypeScript app for searching GitHub repositories, tracking selected repositories, and monitoring their latest statistics.

## Live Demo

https://repo-radar-beryl.vercel.app/

## Features

- Debounced GitHub repository search
- Paginated search results to browse beyond the first result page
- Track and untrack repositories
- Persist tracked repositories across browser refreshes
- Refresh one or all tracked repositories
- Independent loading and error states per repository
- Display stars, open issues, language, and latest commit date
- Stars and open issues charts
- Light and dark theme with persisted preference

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

- **State:** Search state, including the current page, is kept local to the search page, while shared tracked-repository state is managed with Redux Toolkit.
- **Data layer:** GitHub API calls are isolated in a service layer and mapped to the app's own `Repository` model. Search pagination is handled through GitHub API page parameters instead of loading all results at once.
- **Async operations:** Search uses debounce and request cancellation. Repository refreshes have independent loading and error states.
- **Persistence:** Tracked repositories and theme preference are stored in `localStorage`.
- **Performance:** The tracked repositories page is lazy-loaded because it includes the chart components.

## Assumptions and Limitations

## Assumptions and Limitations

- The app uses the unauthenticated GitHub REST API, so rate limits apply.
- GitHub Search exposes up to the first 1,000 results for a query. Since the app shows 10 results per page, pagination is capped at 100 pages.
- GitHub API rate limits may temporarily affect search, pagination, and repository refresh requests.
- Data is stored only in the current browser; there is no backend or user account system.