# Repo Radar - Manual Test Report

## 1. Test Summary

This report documents the manual verification of the Repo Radar frontend application against the functional, technical, and added enhancement requirements.

### Application

- **Application:** Repo Radar
- **Test Environment:** Production deployment
- **Test URL:** https://repo-radar-beryl.vercel.app/
- **Test Type:** Manual Functional and Technical Verification
- **Browser:** Google Chrome / Desktop
- **Overall Status:** In Progress

> All manual test cases in this report are executed against:
> https://repo-radar-beryl.vercel.app/

### Execution Summary

| Status | Count |
|---|---:|
| Pass | 0 |
| Fail | 0 |
| Blocked | 0 |
| Not Run | 20 |

---

# 2. Requirements

## 2.1 Functional Requirements

| ID | Requirement |
|---|---|
| FR-01 | Debounced GitHub repository search |
| FR-02 | Track and untrack repositories |
| FR-03 | Tracked Repositories view |
| FR-04 | Display stars, open issues, and last commit date |
| FR-05 | Refresh individual repositories and/or all repositories |
| FR-06 | Independent loading and error states per repository |
| FR-07 | Persist tracked repositories using localStorage |
| FR-08 | Proper TypeScript types |
| FR-09 | Bar chart showing stars per tracked repository |

## 2.2 Architecture / Technical Requirements

| ID | Requirement |
|---|---|
| AR-01 | Clear state and data-layer design |
| AR-02 | Scalability and maintainability |
| AR-03 | Clean asynchronous operation handling |
| AR-04 | Code quality |

## 2.3 Added Enhancements

| ID | Enhancement |
|---|---|
| ENH-01 | Paginated GitHub search results |
| ENH-02 | Open Issues chart |
| ENH-03 | Tracked repository sorting |
| ENH-04 | Dashboard summary cards |
| ENH-05 | Light / Dark theme switching |
| ENH-06 | Tracked repository count in the header |
| ENH-07 | Lazy loading of the Tracked Repositories page |

---

# 3. Functional Test Execution

## TC-01 - Verify Debounced GitHub Repository Search

**Requirement:** FR-01, AR-03  
**Status:** Not Run

### Preconditions

- Repo Radar is open on the Search page.
- Browser DevTools Network tab is open.

### Steps

1. Clear the Network tab.
2. Quickly type `react` into the search field without pausing between characters.
3. Observe the Network tab while typing.
4. Stop typing and wait for the debounce period.

### Expected Result

- A search request is not sent for every keystroke.
- The request is triggered after the user stops typing.
- Search results correspond to the final query.

### Actual Result

_To be filled after execution._

### Evidence / Notes

_To be filled if needed._

---

## TC-02 - Verify Stale Search Request Cancellation

**Requirement:** FR-01, AR-03  
**Status:** Not Run

### Preconditions

- Browser DevTools is open.

### Steps

1. Open the Network tab.
2. Enable a slow network profile such as Slow 3G.
3. Search for `react`.
4. Before the request completes, replace the search query with `redux`.
5. Observe the requests and displayed results.

### Expected Result

- The previous request is cancelled or ignored.
- Results from the previous query do not overwrite the latest results.
- Only results belonging to the current query are displayed.

### Actual Result

_To be filled after execution._

### Evidence / Notes

_To be filled if needed._

---

## TC-03 - Verify Search Pagination

**Requirement:** FR-01, ENH-01  
**Status:** Not Run

### Steps

1. Search for a common term such as `react`.
2. Verify that the first page displays up to 10 results.
3. Verify that pagination controls are displayed.
4. Select page 2.
5. Observe the Network request.
6. Return to page 1.

### Expected Result

- Page 1 displays the first set of search results.
- Selecting page 2 sends a GitHub search request for page 2.
- The displayed results change to the second page.
- Pagination controls remain usable.

### Actual Result

_To be filled after execution._

### Evidence / Notes

_To be filled if needed._

---

## TC-04 - Verify Pagination Resets for a New Search

**Requirement:** FR-01, ENH-01  
**Status:** Not Run

### Steps

1. Search for `react`.
2. Navigate to any page greater than page 1.
3. Replace the query with `redux`.

### Expected Result

- Pagination resets to page 1.
- Results belong to the new query.
- The previous query's page number is not reused.

### Actual Result

_To be filled after execution._

---

## TC-05 - Verify Track Repository

**Requirement:** FR-02, FR-03, ENH-06  
**Status:** Not Run

### Steps

1. Search for a repository.
2. Click Track.
3. Open the Tracked Repositories view.

### Expected Result

- The repository is marked as tracked.
- The tracked repository count in the header increases.
- The repository appears in the Tracked Repositories view.
- The same repository is not added more than once.

### Actual Result

_To be filled after execution._

---

## TC-06 - Verify Untrack Repository

**Requirement:** FR-02, FR-03, ENH-06  
**Status:** Not Run

### Preconditions

- At least one repository is tracked.

### Steps

1. Open the Tracked Repositories view.
2. Click Untrack for one repository.

### Expected Result

- The repository is removed from the tracked repositories list.
- The tracked count in the header decreases.
- The repository is removed from the charts.

### Actual Result

_To be filled after execution._

---

## TC-07 - Verify Tracked Repository Statistics

**Requirement:** FR-04  
**Status:** Not Run

### Steps

1. Track a repository.
2. Open the Tracked Repositories view.
3. Refresh the repository.

### Expected Result

The repository displays:

- Stars
- Open issues
- Language
- Last commit date

### Actual Result

_To be filled after execution._

---

## TC-08 - Verify Individual Repository Refresh

**Requirement:** FR-05, FR-06, AR-03  
**Status:** Not Run

### Preconditions

- At least two repositories are tracked.

### Steps

1. Open the Tracked Repositories view.
2. Click Refresh on only one repository.
3. Observe the selected repository and the remaining repository cards.

### Expected Result

- Only the selected repository enters its refreshing state.
- Other repository cards remain usable.
- Updated repository data is displayed after the request completes.
- Other repositories are not blocked by the refresh.

### Actual Result

_To be filled after execution._

---

## TC-09 - Verify Refresh All

**Requirement:** FR-05, FR-06, AR-03  
**Status:** Not Run

### Preconditions

- Multiple repositories are tracked.

### Steps

1. Open the Tracked Repositories view.
2. Click Refresh All.
3. Observe the repository loading states.
4. Wait for the operations to complete.

### Expected Result

- Refresh operations start for all tracked repositories.
- Loading states are maintained independently per repository.
- Each repository updates when its request completes.
- The page remains responsive while refresh operations are running.

### Actual Result

_To be filled after execution._

---

## TC-10 - Verify Independent Repository Error State

**Requirement:** FR-06, AR-03  
**Status:** Not Run

### Preconditions

- At least two repositories are tracked.
- Browser DevTools is open.

### Steps

1. Open DevTools.
2. Use Network Request Blocking.
3. Block requests for one tracked repository, for example:

   `*api.github.com/repos/<owner>/<repository>*`

4. Refresh the blocked repository.
5. Observe its error state.
6. Refresh another repository whose requests are not blocked.

### Expected Result

- The blocked repository displays an error.
- The error is shown only for that repository.
- Other repositories remain usable.
- Another repository can still refresh successfully.
- The full page does not enter a global error state.

### Actual Result

_To be filled after execution._

### Evidence / Notes

This verifies that loading and error states are maintained per repository rather than globally.

---

## TC-11 - Verify localStorage Persistence

**Requirement:** FR-07  
**Status:** Not Run

### Steps

1. Track multiple repositories.
2. Refresh the browser using F5.
3. Verify the tracked repositories.
4. Close and reopen the application.
5. Verify the tracked repositories again.

### Expected Result

- Tracked repositories remain available after browser refresh.
- Tracked repository state is restored from localStorage when the application starts.

### Actual Result

_To be filled after execution._

---

## TC-12 - Verify Stars Chart

**Requirement:** FR-09  
**Status:** Not Run

### Steps

1. Track multiple repositories.
2. Open the Tracked Repositories view.
3. Compare star values in the repository cards with the Stars chart.
4. Track another repository.
5. Untrack one repository.

### Expected Result

- Every tracked repository is represented in the Stars chart.
- Star values match the repository data.
- Tracking a repository adds it to the chart.
- Untracking removes it from the chart.
- Long repository names remain readable.

### Actual Result

_To be filled after execution._

---

# 4. Enhancement Test Execution

## TC-13 - Verify Open Issues Chart

**Requirement:** ENH-02  
**Status:** Not Run

### Steps

1. Track multiple repositories.
2. Open the Tracked Repositories view.
3. Compare Open Issues chart values with repository cards.
4. Track another repository.
5. Untrack one repository.

### Expected Result

- All tracked repositories appear in the Open Issues chart.
- Issue counts match repository data.
- Tracking adds the repository to the chart.
- Untracking removes it from the chart.

### Actual Result

_To be filled after execution._

---

## TC-14 - Verify Tracked Repository Sorting

**Requirement:** ENH-03  
**Status:** Not Run

### Steps

Verify each sorting option:

1. Name A-Z.
2. Stars High to Low.
3. Open Issues High to Low.
4. Latest Commit.

### Expected Result

- Repository cards follow the selected order.
- Stars and Open Issues charts use the same repository order.
- Sorting does not modify the underlying Redux tracked-repository state.

### Actual Result

_To be filled after execution._

---

## TC-15 - Verify Dashboard Summary Values

**Requirement:** ENH-04  
**Status:** Not Run

### Steps

1. Track multiple repositories.
2. Compare the dashboard totals with repository card data.
3. Refresh one repository.
4. Untrack one repository.

### Expected Result

The dashboard correctly displays:

- Tracked repository count
- Total stars
- Total open issues

The values update automatically when tracked repository state changes.

### Actual Result

_To be filled after execution._

---

## TC-16 - Verify Theme Switching and Persistence

**Requirement:** ENH-05  
**Status:** Not Run

### Steps

1. Switch from light mode to dark mode.
2. Verify the application theme changes.
3. Refresh the browser.
4. Verify that dark mode remains selected.
5. Switch back to light mode.

### Expected Result

- Theme changes correctly.
- Theme preference persists after browser refresh.

### Actual Result

_To be filled after execution._

---

# 5. Technical Verification

## CR-01 - Verify State and Data-Layer Design

**Requirement:** AR-01  
**Status:** Not Run

### Checks

Verify that:

- Search query and search results use local component state.
- Pagination state is local to `SearchPage`.
- Sorting state is local to `TrackedReposPage`.
- Shared tracked-repository data is managed using Redux Toolkit.
- GitHub API requests are isolated in `githubApi.ts`.
- GitHub API response types are mapped to the application's `Repository` model.
- Dashboard totals are derived from tracked repository state instead of stored separately.

### Expected Result

State is stored only where it is needed, shared state has a single source of truth, and API logic is separated from UI components.

### Result

_To be filled after review._

---

## CR-02 - Verify Scalability and Maintainability

**Requirement:** AR-02, ENH-07  
**Status:** Not Run

### Checks

Verify that:

- Reusable UI is separated into components.
- Search and tracked repository functionality are separated into features.
- GitHub API logic is not duplicated across UI components.
- Shared application state has a single source of truth.
- External API types and application models are separated.
- Components have clear responsibilities.
- Sorting uses copied repository data rather than mutating Redux state.
- The Tracked Repositories page is lazy-loaded.

### Expected Result

The project structure supports future extensions without unnecessary duplication or tight coupling.

### Result

_To be filled after review._

---

## CR-03 - Verify Asynchronous Operation Handling

**Requirement:** AR-03  
**Status:** Not Run

### Checks

Verify that:

- Search uses debounce.
- Search uses `AbortController` for stale requests.
- Repository refresh operations use Redux Toolkit asynchronous actions.
- Pending, fulfilled, and rejected states are handled.
- Loading state is maintained per repository ID.
- Error state is maintained per repository ID.
- Refreshing one repository does not block other repositories.
- Refresh All supports multiple independent repository requests.

### Expected Result

Asynchronous operations are isolated, stale requests are prevented, and failures do not unnecessarily affect unrelated parts of the UI.

### Result

_To be filled after review._

---

## CR-04 - Verify TypeScript, Lint and Production Build

**Requirement:** FR-08, AR-04  
**Status:** Not Run

### Steps

Run:

```bash
npm run lint
npm run build
```

### Expected Result

- ESLint completes successfully.
- TypeScript compilation succeeds.
- Vite production build completes successfully.

### Actual Result

_To be filled after execution._

---

# 6. Requirement & Enhancement Traceability Matrix

| ID | Type | Requirement / Enhancement | Verification | Status |
|---|---|---|---|---|
| FR-01 | Functional | Debounced GitHub repository search | TC-01, TC-02, TC-03, TC-04 | Not Run |
| FR-02 | Functional | Track / untrack repositories | TC-05, TC-06 | Not Run |
| FR-03 | Functional | Tracked Repositories view | TC-05, TC-06 | Not Run |
| FR-04 | Functional | Stars, open issues and last commit date | TC-07 | Not Run |
| FR-05 | Functional | Refresh individual / all repositories | TC-08, TC-09 | Not Run |
| FR-06 | Functional | Independent loading and error states | TC-08, TC-09, TC-10 | Not Run |
| FR-07 | Functional | Persist tracked repositories | TC-11 | Not Run |
| FR-08 | Functional | Proper TypeScript types | CR-04 | Not Run |
| FR-09 | Functional | Stars bar chart | TC-12 | Not Run |
| AR-01 | Architecture | State and data-layer design | CR-01 | Not Run |
| AR-02 | Architecture | Scalability and maintainability | CR-02 | Not Run |
| AR-03 | Architecture | Clean asynchronous operations | TC-01, TC-02, TC-08, TC-09, TC-10, CR-03 | Not Run |
| AR-04 | Architecture | Code quality | CR-02, CR-04 | Not Run |
| ENH-01 | Enhancement | Search pagination | TC-03, TC-04 | Not Run |
| ENH-02 | Enhancement | Open Issues chart | TC-13 | Not Run |
| ENH-03 | Enhancement | Repository sorting | TC-14 | Not Run |
| ENH-04 | Enhancement | Dashboard summary cards | TC-15 | Not Run |
| ENH-05 | Enhancement | Light / Dark theme | TC-16 | Not Run |
| ENH-06 | Enhancement | Tracked repository count | TC-05, TC-06 | Not Run |
| ENH-07 | Enhancement | Lazy loading | CR-02 | Not Run |

---

# 7. Known Limitations

- The application uses the unauthenticated GitHub REST API, so API rate limits apply.
- GitHub API rate limits may temporarily affect search, pagination, and repository refresh requests.
- GitHub Search exposes up to the first 1,000 results for a query.
- With 10 results per page, search pagination is capped at 100 pages.
- Tracked repositories and theme preferences are stored only in the current browser.
- There is no backend, user authentication, or cross-device synchronization.

---

# 8. Final Test Result

**Overall Status:** In Progress

## Passed Tests

_To be completed after execution._

## Failed Tests

_To be completed after execution._

## Blocked Tests

_To be completed after execution._

## Final Notes

_To be completed after all test cases and technical checks have been executed._