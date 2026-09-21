# Repo Radar - Manual Test Report

## 1. Test Summary

This report documents the manual black-box testing of the Repo Radar frontend application against its functional requirements, user-facing enhancements, and responsive design behavior.

Testing was performed from the end-user perspective using the deployed application.

### Application

- **Application:** Repo Radar
- **Test Environment:** Production deployment
- **Test URL:** https://repo-radar-beryl.vercel.app/
- **Test Type:** Manual Black-Box Testing
- **Primary Browser:** Google Chrome
- **Overall Status:** ✅ Passed

> All test cases were executed against:
> https://repo-radar-beryl.vercel.app/

### Execution Summary

| Status | Count |
|---|---:|
| ✅ Passed | 18 |
| ❌ Failed | 0 |
| Total Executed | 18 |
| Pass Rate | 100% |

### Test Conclusion

All planned manual black-box test cases were executed successfully.

The application successfully satisfies the tested functional requirements and implemented enhancements.

Responsive behavior was also validated using representative **mobile, tablet, and desktop** viewport sizes.

No UI overflow, broken layout, overlapping components, or unexpected layout shifting was identified during testing.

The application follows a primarily **desktop-oriented visual design**. Some views may therefore be less visually optimized on smaller screens, particularly mobile devices. However, all tested functionality remains accessible and no UI-breaking issues were observed.

**Final Result: ✅ Repo Radar passed the planned test scope and is ready for deployment/submission.**

---

# 2. Test Scope and Requirements

## 2.1 Functional Requirements

| ID | Requirement |
|---|---|
| FR-01 | Debounced GitHub repository search |
| FR-02 | Track and untrack repositories |
| FR-03 | Tracked Repositories view |
| FR-04 | Display stars, open issues, and last commit date |
| FR-05 | Refresh individual repositories and/or all repositories |
| FR-06 | Independent loading and error states per repository |
| FR-07 | Persist tracked repositories between browser sessions |
| FR-08 | Bar chart showing stars per tracked repository |

## 2.2 Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-01 | Responsive and usable layout across mobile, tablet, and desktop viewports |

## 2.3 Added Enhancements

| ID | Enhancement |
|---|---|
| ENH-01 | Paginated GitHub search results |
| ENH-02 | Open Issues chart |
| ENH-03 | Tracked repository sorting |
| ENH-04 | Light / Dark theme switching and persistence |
| ENH-05 | Tracked repository count in the header |
| ENH-06 | Untrack All button |
| ENH-07 | Hide / Show Charts button |

---

# 3. Functional Test Execution

## TC-01 - Verify Debounced GitHub Repository Search

**Requirement:** FR-01  
**Status:** ✅ Passed

### Preconditions

- Repo Radar is open on the Search page.
- Browser DevTools Network tab is open.

### Test Data

`react`

### Steps

1. Clear the browser Network log.
2. Quickly type `react` into the search field without intentionally pausing between characters.
3. Observe the Network tab while typing.
4. Stop typing.
5. Wait for the search results to load.

### Expected Result

- A GitHub search request should not be sent for every individual keystroke.
- The application should wait briefly after typing stops before sending the search request.
- Search results should correspond to the final query `react`.
- The application should remain responsive while waiting for the request.

---

## TC-02 - Verify Stale Search Results Are Not Displayed

**Requirement:** FR-01  
**Status:** ✅ Passed

### Preconditions

- Repo Radar is open on the Search page.
- Browser DevTools is available.

### Steps

1. Open the Network tab.
2. Enable a slow network profile such as Slow 3G.
3. Search for `react`.
4. Before the first search finishes, replace the search text with `redux`.
5. Wait for the requests to complete.
6. Observe the final displayed results.

### Expected Result

- Results from the previous `react` query should not overwrite the newer `redux` results.
- The displayed results should correspond only to the current search query.
- Outdated results should not be displayed after the latest request completes.

---

## TC-03 - Verify Search Pagination

**Requirement:** ENH-01  
**Status:** ✅ Passed

### Test Data

`react`

### Steps

1. Search for `react`.
2. Wait for the search results to load.
3. Verify that the first page displays up to 10 repositories.
4. Verify that pagination controls are displayed.
5. Click page 2.
6. Verify that the displayed repositories change.
7. Return to page 1.
8. Verify the Previous and Next pagination controls.

### Expected Result

- The first page should display up to 10 repositories.
- Pagination should be available when multiple result pages exist.
- Selecting another page should load the corresponding repository results.
- Returning to page 1 should restore the first result set.
- Pagination should remain usable throughout the operation.
- The Previous arrow should be disabled on page 1.
- The Next arrow should be disabled on the last available page.

---

## TC-04 - Verify Pagination Resets for a New Search

**Requirement:** ENH-01  
**Status:** ✅ Passed

### Steps

1. Search for `react`.
2. Navigate to page 2 or another page greater than page 1.
3. Replace the query with `redux`.
4. Wait for the new search to complete.

### Expected Result

- Pagination should reset to page 1.
- Results should correspond to `redux`.
- The page number used for the previous search should not remain active.

---

## TC-05 - Verify Track Repository

**Requirement:** FR-02, FR-03, ENH-05  
**Status:** ✅ Passed

### Preconditions

- At least one repository can be found through search.

### Steps

1. Search for a repository.
2. Select Track for the repository.
3. Observe the tracked repository count in the header.
4. Open the Tracked Repositories view.
5. Locate the tracked repository.

### Expected Result

- The selected repository should become tracked.
- The tracked repository count should increase.
- The repository should appear in the Tracked Repositories view.

---

## TC-06 - Verify Untrack Repository

**Requirement:** FR-02, FR-03, ENH-05  
**Status:** ✅ Passed

### Preconditions

- At least one repository is currently tracked.

### Steps

1. Open the Tracked Repositories view.
2. Note the number of tracked repositories.
3. Select Untrack for one repository.
4. Observe the repository list.
5. Observe the tracked repository count.
6. Observe the charts.

### Expected Result

- The selected repository should be removed from the tracked repositories.
- The tracked repository count should decrease by one.
- The repository should no longer appear in the repository list.
- The repository should no longer appear in the charts.

---

## TC-07 - Verify Tracked Repository Statistics

**Requirement:** FR-04  
**Status:** ✅ Passed

### Preconditions

- At least one repository is tracked.

### Steps

1. Open the Tracked Repositories view.
2. Locate a tracked repository.
3. Refresh the repository if required.
4. Review the displayed repository information.

### Expected Result

The repository should display:

- Repository name
- Stars
- Open issues
- Language, when available
- Last commit date

The displayed information should remain readable and associated with the correct repository.

---

## TC-08 - Verify Individual Repository Refresh

**Requirement:** FR-05, FR-06  
**Status:** ✅ Passed

### Preconditions

- At least two repositories are tracked.

### Steps

1. Open the Tracked Repositories view.
2. Click Refresh on one repository only.
3. Observe the selected repository.
4. Observe another repository while the refresh is running.
5. Wait for the refresh to complete.

### Expected Result

- Only the selected repository should display its refresh/loading state.
- Other repositories should remain usable.
- Other repository cards should not incorrectly display a loading state.
- The selected repository should display refreshed data after completion.

---

## TC-09 - Verify Refresh All and Loading State

**Requirement:** FR-05, FR-06  
**Status:** ✅ Passed

### Preconditions

- Multiple repositories are tracked.

### Steps

1. Open the Tracked Repositories view.
2. Click Refresh All.
3. Observe the Refresh All control.
4. Observe each repository card while refresh operations are running.
5. Observe the loading state.
6. Wait for all requests to finish.

### Expected Result

- Refresh operations should start for all tracked repositories.
- Repository loading states should be handled correctly.
- Repositories should update independently as requests complete.
- The application should remain responsive.
- A visible loading state should indicate that refresh operations are in progress.
- Refresh All should return to its normal state when all operations finish.

---

## TC-10 - Verify Independent Repository Error State

**Requirement:** FR-06  
**Status:** ✅ Passed

### Preconditions

- At least two repositories are tracked.
- Browser DevTools is available.

### Steps

1. Open Chrome DevTools.
2. Open Network Request Blocking / Request Conditions.
3. Block requests for one tracked repository using a pattern such as:

   `*api.github.com/repos/<owner>/<repository>*`

4. Refresh the blocked repository.
5. Observe the repository card.
6. Refresh another repository whose requests are not blocked.
7. Observe both repository cards.

### Expected Result

- The blocked repository should display an error state.
- The error should be associated only with the affected repository.
- Other repository cards should remain usable.
- A different repository should still refresh successfully.
- The entire Tracked Repositories page should not enter a global error state.

---

## TC-11 - Verify Tracked Repository Persistence

**Requirement:** FR-07  
**Status:** ✅ Passed

### Preconditions

- Multiple repositories are tracked.

### Steps

1. Note the currently tracked repositories.
2. Refresh the page using F5.
3. Open the Tracked Repositories view.
4. Verify the repositories.
5. Close the browser tab.
6. Reopen the application using the production test URL.
7. Open the Tracked Repositories view again.

### Expected Result

- Previously tracked repositories should remain available after browser refresh.
- Previously tracked repositories should remain available after reopening the application in the same browser.
- The tracked repository count should remain consistent with the persisted repositories.

---

## TC-12 - Verify Horizontal Stars Bar Chart and Repository Labels

**Requirement:** FR-08  
**Status:** ✅ Passed

### Preconditions

- Multiple repositories are tracked.

### Steps

1. Open the Tracked Repositories view.
2. Locate the Stars chart.
3. Compare the repositories displayed in the chart with the tracked repository cards.
4. Compare displayed star values.
5. Track another repository.
6. Return to the Tracked Repositories view if needed.
7. Untrack one repository.

### Expected Result

- Every tracked repository should be represented in the Stars chart.
- Star values should correspond to tracked repository data.
- Tracking a new repository should add it to the chart.
- Untracking a repository should remove it from the chart.
- Repository labels should remain readable or safely truncated.
- Repository names should be displayed neatly.
- Bars should be displayed horizontally.

---

# 4. Enhancement and UI Test Execution

## TC-13 - Verify Horizontal Open Issues Chart and Repository Labels

**Requirement:** ENH-02  
**Status:** ✅ Passed

### Preconditions

- Multiple repositories are tracked.

### Steps

1. Open the Tracked Repositories view.
2. Locate the Open Issues chart.
3. Compare chart values with the corresponding repository information.
4. Track another repository.
5. Untrack one repository.

### Expected Result

- Every tracked repository should be represented in the Open Issues chart.
- Open issue values should correspond to repository data.
- Tracking a repository should add it to the chart.
- Untracking a repository should remove it from the chart.
- Repository names should remain neatly displayed and readable.
- Bars should be displayed horizontally.

---

## TC-14 - Verify Tracked Repository Sorting

**Requirement:** ENH-03  
**Status:** ✅ Passed

### Preconditions

- Multiple repositories with different names and statistics are tracked.

### Steps

1. Select **Name (A-Z)**.
2. Verify repository ordering.
3. Select **Stars (High to Low)**.
4. Verify repository ordering.
5. Select **Open Issues (High to Low)**.
6. Verify repository ordering.
7. Select **Latest Commit**.
8. Verify repository ordering.
9. Observe the charts after changing each sorting option.

### Expected Result

- Name sorting should display repositories alphabetically from A to Z.
- Stars sorting should display repositories from highest to lowest stars.
- Open Issues sorting should display repositories from highest to lowest issue count.
- Latest Commit sorting should display the repository with the most recent commit first.
- Repository cards and charts should follow a consistent ordering.

---

## TC-15 - Verify Theme Switching and Persistence

**Requirement:** ENH-04  
**Status:** ✅ Passed

### Steps

1. Open the application in light mode.
2. Switch to dark mode.
3. Navigate between Search and Tracked Repositories.
4. Refresh the browser.
5. Verify the selected theme after refresh.
6. Switch back to light mode.
7. Refresh the browser again.

### Expected Result

- The application should switch correctly between light and dark themes.
- Both main views should consistently use the selected theme.
- The selected theme should remain after browser refresh.
- Returning to light mode should also persist.

---

## TC-16 - Verify Hide / Show Charts Button

**Requirement:** ENH-07  
**Status:** ✅ Passed

### Preconditions

- Multiple repositories are tracked.
- Charts are currently visible.

### Steps

1. Open the Tracked Repositories view.
2. Locate the **Hide Charts** button.
3. Click **Hide Charts**.
4. Observe the page.
5. Click **Show Charts**.

### Expected Result

- The Stars and Open Issues charts should be hidden after selecting Hide Charts.
- Repository cards should remain visible.
- The button label should change to **Show Charts**.
- Clicking Show Charts should display the charts again.
- The button label should return to **Hide Charts**.

---

## TC-17 - Verify Untrack All Button

**Requirement:** ENH-06  
**Status:** ✅ Passed

### Preconditions

- Multiple repositories are tracked.

### Steps

1. Open the Tracked Repositories view.
2. Locate the **Untrack All** button.
3. Click **Untrack All**.
4. Observe the Tracked Repositories page.
5. Observe the tracked repository count in the header.

### Expected Result

- All tracked repository cards should be removed.
- Charts should no longer be displayed when no repositories are tracked.
- The tracked repository count in the header should return to zero.
- Sort controls should become disabled when applicable.
- Untrack All should become disabled when there are no tracked repositories.
- Refresh All should become disabled.
- The Show / Hide Charts control should no longer be displayed when no charts are available.
- Tracked repository data should be removed from browser persistence.

---

## TC-18 - Verify Responsive Design and Component Resizing

**Requirement:** NFR-01  
**Status:** ✅ Passed

### Test Devices

| Device Type | Representative Viewport |
|---|---:|
| Mobile | 375 × 812 |
| Tablet | 768 × 1024 |
| Desktop | 1440 × 900 |

### Steps

1. Open the Search page using the mobile viewport.
2. Verify:
   - Header
   - Navigation controls
   - Search input
   - Repository cards
   - Track / Untrack controls
   - Pagination
3. Open the Tracked Repositories view.
4. Verify:
   - Page title and description
   - Sort control
   - Refresh All button
   - Untrack All button
   - Hide / Show Charts button
   - Stars chart
   - Open Issues chart
   - Repository cards
5. Repeat the same checks using the tablet viewport.
6. Repeat the same checks using the desktop viewport.
7. Resize the viewport between the tested sizes.
8. Observe component resizing and layout behavior.
9. Verify both light and dark themes on the tested viewport sizes.

### Expected Result

- Components should resize according to the available viewport.
- No unwanted horizontal overflow should occur.
- No elements should overlap.
- No unexpected layout shifts should occur.
- Buttons and controls should remain accessible and usable.
- Search results and repository cards should adapt correctly.
- Pagination should remain functional.
- Charts should remain within their containers.
- Long repository names should not break the layout.
- Navigation should remain usable across all tested devices.
- Light and dark modes should remain functional across all tested viewport sizes.

### Responsive Design Observation

The application successfully responds to the tested mobile, tablet, and desktop viewport sizes without UI breaks, overflow, or unexpected layout shifting.

The interface is primarily designed for **desktop usage**. As a result, some views may be less visually optimized or less visually appealing on smaller screens, particularly mobile devices.

This is considered a visual-design limitation rather than a functional responsiveness issue because all components remain accessible, usable, and correctly positioned.

---

# 5. Requirement Traceability Matrix

| Requirement / Enhancement | Verified By | Status |
|---|---|---|
| FR-01 - Debounced GitHub repository search | TC-01, TC-02 | ✅ Passed |
| FR-02 - Track / untrack repositories | TC-05, TC-06 | ✅ Passed |
| FR-03 - Tracked Repositories view | TC-05, TC-06 | ✅ Passed |
| FR-04 - Stars, open issues, and last commit date | TC-07 | ✅ Passed |
| FR-05 - Refresh individual / all repositories | TC-08, TC-09 | ✅ Passed |
| FR-06 - Independent loading and error states | TC-08, TC-09, TC-10 | ✅ Passed |
| FR-07 - Persist tracked repositories | TC-11 | ✅ Passed |
| FR-08 - Stars bar chart | TC-12 | ✅ Passed |
| NFR-01 - Responsive design | TC-18 | ✅ Passed |
| ENH-01 - Search pagination | TC-03, TC-04 | ✅ Passed |
| ENH-02 - Open Issues chart | TC-13 | ✅ Passed |
| ENH-03 - Repository sorting | TC-14 | ✅ Passed |
| ENH-04 - Light / Dark theme switching and persistence | TC-15 | ✅ Passed |
| ENH-05 - Tracked repository count in header | TC-05, TC-06 | ✅ Passed |
| ENH-06 - Untrack All button | TC-17 | ✅ Passed |
| ENH-07 - Hide / Show Charts button | TC-16 | ✅ Passed |

---

# 6. Final Test Result

## Overall Status

**✅ PASSED**

### Final Execution Summary

| Result | Count |
|---|---:|
| ✅ Passed | 18 |
| ❌ Failed | 0 |
| Total Executed | 18 |
| Pass Rate | 100% |

### Functional Validation

All defined functional requirements were successfully verified.

Core workflows including repository search, tracking, untracking, persistence, individual refresh, Refresh All, independent loading and error handling, repository statistics, and chart visualization behaved as expected.

### Enhancement Validation

All implemented enhancements were successfully verified:

- Search pagination
- Open Issues chart
- Repository sorting
- Light / Dark theme persistence
- Tracked repository count
- Untrack All
- Hide / Show Charts

### Responsive Design Validation

The application was validated using representative:

- Mobile
- Tablet
- Desktop

viewport sizes.

No UI overflow, broken layouts, overlapping components, or unexpected layout shifting was identified.

The application uses a primarily desktop-oriented visual design, so some views may be less visually optimized on smaller mobile screens. This does not affect functionality or cause UI-breaking behavior.

### Final Conclusion

**All 18 planned manual black-box test cases passed successfully with a 100% pass rate.**

No blocking functional defects were identified during the executed test scope.

The tested Repo Radar build satisfies the validated functional requirements and implemented enhancements.

## ✅ Ready for Deployment / Submission