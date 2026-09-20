# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # Repo Radar

  Repo Radar is a React and TypeScript application for searching GitHub repositories, tracking selected repositories, and monitoring their stars, open issues, and latest commit dates.

  ## Setup

  Requirements: Node.js 20 or newer and npm.

  ```bash
  npm install
  npm run dev
  ```

  Open the local URL printed by Vite. Other useful commands are:

  ```bash
  npm run build    # Type-check and create a production build
  npm run lint     # Run ESLint
  npm run preview  # Preview the production build
  ```

  ## Features

  - Search public GitHub repositories with a debounced search field.
  - Track and untrack repositories from search results.
  - Persist tracked repositories in browser `localStorage`.
  - Refresh one repository or all repositories concurrently.
  - Show independent loading and error states for each repository.
  - Display stars, open issues, language, and latest commit date.
  - Show stars and open issues in responsive horizontal bar charts.
  - Switch between light and dark themes; the preference is persisted locally.

  The charts use a horizontal layout intentionally. Repository names can be long, so placing them on the y-axis gives each label more room and keeps the chart readable.

  ## Architecture and technical decisions

  - **React + TypeScript + Vite:** fast development feedback with strict domain models.
  - **Redux Toolkit:** owns the durable tracked-repository collection and refresh lifecycle.
  - **Typed async thunk:** one refresh data path is shared by initial tracking, individual refresh, and refresh-all operations.
  - **Local component state:** limited to view-specific concerns such as the current search query and debounced search results.
  - **API boundary:** `githubApi.ts` maps GitHub response shapes into the app's `Repository` model, keeping external API details out of UI components.
  - **Feature organization:** search and tracked repositories are kept in separate feature folders; reusable cards and app navigation live in `components`.
  - **Lazy loading:** the tracked-repositories route is loaded on demand because it includes chart dependencies, reducing the initial bundle size.

  ## Assumptions and limitations

  - The app uses the public GitHub API without authentication. GitHub rate limits therefore apply.
  - Tracked data and theme preference are stored only in the current browser's `localStorage`; they are not synchronized between devices.
  - Commit dates are loaded when a repository is first tracked and whenever it is refreshed.
  - A repository with no commits may show no commit date.
  - There is no backend, user account, or server-side persistence.
    },
