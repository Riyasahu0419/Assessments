# React Mini Apps

A collection of 7 self-contained React mini applications built with **Vite + React 18 + TypeScript**, demonstrating real-world frontend patterns and concepts.

---

## Tech Stack

| Category     | Technology                          |
|--------------|-------------------------------------|
| Build Tool   | Vite 6                              |
| Framework    | React 18                            |
| Language     | TypeScript 5                        |
| Routing      | React Router v6                     |
| UI / Styling | Bootstrap 5 + Tailwind CSS 4        |
| Icons        | React Icons 5                       |
| Testing      | Vitest + React Testing Library      |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

Open `http://localhost:5173` in your browser.

---

## Project Structure

```
react-mini-apps/
├── src/
│   ├── main.tsx                  # Entry point
│   ├── App.tsx                   # Router + global nav shell
│   ├── index.css                 # Global CSS imports
│   ├── config/
│   │   └── constants.ts          # API base URL, pagination, virtualization config
│   ├── utils/
│   │   └── helpers.ts            # apiFetch<T>() utility
│   ├── files-css/                # Per-feature CSS files
│   │   ├── colors.css            # CSS custom properties (theme tokens)
│   │   ├── dashboard.css
│   │   ├── accordion.css
│   │   ├── landing.css
│   │   ├── form.css
│   │   ├── kanban.css
│   │   └── performance.css
│   └── features/
│       ├── landing-page/         # Mini App 1
│       ├── api-dashboard/        # Mini App 2
│       ├── accordion/            # Mini App 3
│       ├── custom-hooks/         # Mini App 4
│       ├── multi-step-form/      # Mini App 5
│       ├── kanban-board/         # Mini App 6
│       ├── performance-demo/     # Mini App 7
│       └── not-found/            # 404 page
```

---

## Mini Apps

### 1. Landing Page — `/`

A responsive marketing-style landing page.

- Components: `Navbar`, `Hero`, `Features`, `FeatureCard`, `Footer`
- Sticky navbar, hero section with CTA buttons, 3-column features grid
- Responsive: 3 columns on desktop → stacked on mobile (Bootstrap grid)
- Purely presentational — no data fetching

---

### 2. API Dashboard — `/dashboard`

Fetches and displays posts enriched with author data from [JSONPlaceholder](https://jsonplaceholder.typicode.com).

**Core logic:**
```
Fetch /users + /posts in parallel (Promise.all)
  → Build userMap = { [userId]: { name, email } }
  → Enrich each post: post.author = userMap[post.userId]
  → Filter by selectedUserIds → filter by searchTerm → sort
  → Paginate (9 per page)
```

- Components: `Dashboard`, `PostCard`, `SearchBar`, `SortDropdown`, `UserSidebar`
- Filter pipeline runs in-memory via `useMemo` — no re-fetching
- Loading spinner and error state handled
- Sort options: Title A→Z, Title Z→A, Author name

---

### 3. Accordion — `/accordion`

A reusable expand/collapse component.

- Single `activeId: string | null` state — only one panel open at a time
- Clicking the open panel closes it (sets `activeId` to `null`)
- Animation via CSS `max-height` transition — no JS show/hide
- Fully accessible: `aria-expanded`, `aria-controls`, `role="region"`

---

### 4. Custom Hooks — `/hooks`

Three reusable hooks with a live demo UI.

| Hook | What it does |
|------|-------------|
| `useLocalStorage<T>` | Lazy-reads from `localStorage` on mount, persists on every change |
| `useFetch<T>` | Fetches a URL, returns `{ data, loading, error }`, cancels with `AbortController` on unmount |
| `useDebounce<T>` | Delays a value update by N ms — prevents excessive API calls on keystrokes |

---

### 5. Multi-Step Form — `/form`

A 3-step registration form with validation.

- One centralized `formData: { name, email, password }` state shared across all steps
- Step 1 validates: `name` must be non-empty
- Step 2 validates: `email` format + `password` ≥ 8 characters
- Back navigation preserves all entered data
- Step 3 shows a read-only review before final submit
- Success screen shown on submit

---

### 6. Kanban Board — `/kanban`

A drag-and-drop task manager using the native HTML5 DnD API — no third-party library.

```
columns = { todo: Task[], inProgress: Task[], done: Task[] }
```

- `dragstart` → stores `{ taskId, sourceColumn }` in a ref
- `dragover` → `preventDefault()` to allow drop
- `drop` → moves task immutably; same-column drops are no-ops
- Add tasks via input (Enter or + button), delete via trash icon
- All state updates use `setColumns(prev => ...)` for immutability

---

### 7. Performance Demo — `/performance`

Demonstrates React rendering optimizations on a list of 10,000 items.

| Technique | Applied to |
|-----------|-----------|
| `useMemo` | Caches filtered item list — recomputes only when filter or items change |
| `useCallback` | Stabilizes the filter input handler — prevents recreation on every render |
| `React.memo` | Wraps `ListItem` — skips re-render if item prop is unchanged |
| Virtualization | Custom scroll-based — renders only ~20 visible DOM nodes regardless of list size |

**Virtualization math:**
```
startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN)
endIndex   = Math.min(total, startIndex + visibleCount)
```
Items are absolutely positioned inside a full-height inner div.

---

## Key Patterns

**Feature-based folder structure** — each mini app is fully self-contained under `src/features/`. No cross-feature imports.

**Centralized CSS** — all feature CSS files live in `src/files-css/` and are imported once in `index.css`. Theme tokens (colors, spacing) defined as CSS custom properties in `colors.css`.

**Centralized config** — `src/config/constants.ts` holds the API base URL, pagination size, and virtualization dimensions. One place to change, everywhere updates.

**Immutable state** — Kanban board uses `setColumns(prev => ({ ...prev, [col]: [...] }))` pattern throughout. No direct mutation.

**AbortController cleanup** — both `useFetch` and the Dashboard's `useEffect` cancel in-flight requests on unmount to prevent state updates on unmounted components.

---

## Routes

| Path | Mini App |
|------|----------|
| `/` | Landing Page |
| `/dashboard` | API Dashboard |
| `/accordion` | Accordion |
| `/hooks` | Custom Hooks |
| `/form` | Multi-Step Form |
| `/kanban` | Kanban Board |
| `/performance` | Performance Demo |
| `*` | 404 Not Found |
