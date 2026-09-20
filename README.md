# Repo Radar

Repo Radar is a React + TypeScript application for searching GitHub repositories, tracking selected repositories, and monitoring their latest statistics.

## Live Demo

https://repo-radar-beryl.vercel.app/

## Features

- Search public GitHub repositories with debounced search
- Track and untrack repositories
- Persist tracked repositories across browser refreshes
- Refresh a single repository or all tracked repositories
- Independent loading and error states for each repository
- Display stars, open issues, language, and latest commit date
- Visualize stars and open issues using bar charts
- Light and dark theme switching with persisted preference

## Tech Stack

- React
- TypeScript
- Vite
- Redux Toolkit
- Material UI
- MUI X Charts
- GitHub REST API
- Vercel

## Setup

Clone the repository and install the dependencies:

```bash
npm install
```

Run the application locally:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

## Architecture and Technical Decisions

The application keeps local and shared state separate based on where the data is needed.

Search query, results, loading, and error state are kept locally in the search page because they are only used there. Redux Toolkit is used for tracked repositories because that data is shared between the tracked repositories page, charts, and header.

GitHub API calls are kept in a separate service layer so API logic is not mixed with UI components. API responses are also mapped to the application's own repository model before being used by the UI.

Repository refresh operations are handled asynchronously with independent loading and error states, so refreshing one repository does not block the others.

Tracked repositories and the selected theme are stored in `localStorage` so they remain available after refreshing or reopening the application.

The tracked repositories page is lazy-loaded because it contains the chart-related code and is not required when the application first loads.

## Assumptions and Limitations

- The application uses the public GitHub REST API without authentication, so GitHub API rate limits apply.
- Search results are limited and pagination is not implemented.
- Tracked repositories and theme preferences are stored only in the current browser.
- The application has no backend, user authentication, or cross-device synchronization.