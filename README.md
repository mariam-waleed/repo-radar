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
- Additional **Open Issues chart**
- **Light and dark theme** with persisted preference
- **Tracked repository** count in the header
- **Untrack All Button** to untrack all tracked repositories
- **Hide/Show Charts button** to make the page display more flexible
- **Loading indicator bar:** Tracked repository refreshes show a visible loading indicator, including Refresh All.
- **Lazy loading** of the tracked repositories page

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

## Performance Considerations

### Bundle Performance

- The Tracked Repositories page is lazy-loaded, so chart-related code is loaded only when the user opens that view.
- This keeps the initial Search view bundle lighter and improves initial application load.

### Network Performance

- GitHub search uses a 500 ms debounce to reduce unnecessary API requests while the user is typing.
- Previous search requests are cancelled when a newer search starts, preventing stale requests from continuing unnecessarily.
- Search results are intentionally kept lightweight. Latest commit data is fetched only for tracked repositories, avoiding an N+1 request pattern for every search page.
- Search results are paginated to 10 repositories per page, limiting the amount of data requested at one time.

### Runtime / Application Behavior

- Repository monitoring is performed on demand rather than through continuous background polling.
- Individual repositories can be refreshed independently without refreshing the entire tracked repository list.
- Dashboard summary values are derived from the existing tracked repository state instead of maintaining duplicated state that would need additional synchronization.

## Assumptions and Limitations

- GitHub API rate limits may temporarily affect search, pagination, and repository refresh requests.
- GitHub Search exposes up to the first 1,000 results for a query. With 10 results per page, pagination is capped at 100 pages.
- Data is stored only in the current browser; there is no backend or user account system.

## Testing

The application was manually tested against its functional requirements, enhancements, and responsive behavior.

- **Test cases:** 18
- **Passed:** 18
- **Pass rate:** 100%
- **Environment:** Production deployment using Google Chrome

See the complete [Manual Test Report](docs/Manual_Test_Report.md).