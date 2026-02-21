# CLAUDE.md

This file provides guidance to AI assistants (Claude and others) working in this repository.

---

## Project Overview

**ВидеоПоиск** is a Next.js 14 web application that lets users search for movies and TV series and find where to stream them across major Russian and international platforms.

**What it does:**
- Accepts a movie/series title as a search query
- Fetches results from the [Kinopoisk Unofficial API](https://kinopoisk.dev) (v1.4)
- Displays title, year, Kinopoisk rating, genres, description, and poster
- Provides direct search links to: Кинопоиск, Иви, Окко, Старт, YouTube, ВКонтакте

**Primary users:** Russian-speaking audiences looking for streaming options.

**Remote:** `dzigurdarahmet-byte/SergeySS`

---

## Repository Structure

```
/
├── app/
│   ├── layout.js           # Root layout — sets <html lang="ru"> and page metadata
│   └── page.js             # Main (and only) page — search UI and results rendering
├── .env.local.example      # Template for required environment variables
├── .gitignore
├── next.config.js          # Next.js configuration (currently default/empty)
├── package.json            # Dependencies and npm scripts
└── CLAUDE.md               # This file
```

The project uses the **Next.js App Router** (`app/` directory). There is currently a single route (`/`). All logic lives in `app/page.js`.

---

## Key Source File: `app/page.js`

| Concern | Details |
|---|---|
| Directive | `'use client'` — Client Component; all state and event handling runs in the browser |
| State | `query`, `results`, `searched`, `loading`, `error` — managed with `useState` |
| API call | `GET https://api.kinopoisk.dev/v1.4/movie/search?query=…&limit=5&page=1` with `X-API-KEY` header |
| Services | `SERVICES` array at top of file — defines the six streaming platforms with `name`, `color`, and `url` prefix |
| Styling | Inline style objects throughout; dark theme (`#0a0a0a` background, `#FF4B2B` accent); no CSS framework |

### Kinopoisk API response shape (`docs[]`)

Each result object the UI consumes:

```js
{
  id,
  name,              // Russian title
  alternativeName,   // English / original title
  year,
  rating: { kp },   // Kinopoisk score (float)
  genres: [{ name }],
  description,       // Long-form plot text
  poster: { url },   // Poster image URL
}
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_KINOPOISK_API_KEY` | Yes | API key for [kinopoisk.dev](https://kinopoisk.dev). Prefixed with `NEXT_PUBLIC_` so it is available in Client Components. |

**Setup:**
```bash
cp .env.local.example .env.local
# Edit .env.local and fill in NEXT_PUBLIC_KINOPOISK_API_KEY
```

> **Security:** Never hard-code the API key in source files. Never commit `.env.local`.
> Note: `NEXT_PUBLIC_` variables are bundled into client-side JS and visible in the browser — this is acceptable for this API key, but do not use this prefix for truly secret credentials.

---

## Development Setup

**Prerequisites:** Node.js 18+ and npm (or pnpm/yarn).

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.local.example .env.local
#    → set NEXT_PUBLIC_KINOPOISK_API_KEY in .env.local

# 3. Start dev server
npm run dev
#    → http://localhost:3000
```

---

## Build and Run Commands

| Task | Command |
|---|---|
| Dev server | `npm run dev` |
| Production build | `npm run build` |
| Start production server | `npm start` |
| Lint | `npm run lint` |

---

## Testing

No test framework is currently configured. If adding tests:
- Use **Jest** + **React Testing Library** (standard for Next.js)
- Place test files alongside source as `*.test.js` or in a top-level `__tests__/` directory
- The main logic to cover is `handleSearch`: mock `fetch`, assert state transitions and rendered output

---

## Code Style and Conventions

- **No CSS framework** — styling uses inline style objects. Match this pattern when adding UI.
- **No TypeScript** — the project uses plain JavaScript (`.js`). Do not introduce `.ts`/`.tsx` unless the project explicitly migrates.
- **Minimal abstraction** — all logic is in `app/page.js`. Only extract components or utilities when there is a clear, repeated need.
- **Russian UI strings** — all user-facing text is in Russian. Keep it that way.
- **Indentation** — 2 spaces.
- **No unnecessary comments** — only comment logic that is non-obvious.
- **No speculative abstractions** — solve the current problem; avoid over-engineering.

---

## Adding a New Streaming Service

Edit the `SERVICES` array at the top of `app/page.js`:

```js
{ name: 'ServiceName', color: '#HEXCOLOR', url: 'https://service.example/search?q=' },
```

The `url` must be a prefix that accepts the title appended directly (the component applies `encodeURIComponent` before appending).

---

## Security Notes

1. The API key **must** come from `process.env.NEXT_PUBLIC_KINOPOISK_API_KEY` — never hard-coded in source files.
2. All streaming service links use `target="_blank" rel="noopener noreferrer"` — preserve this on any new external links.
3. Never commit `.env.local` or any file containing credentials.

---

## Git Workflow

### Branch Naming

| Type | Pattern | Example |
|---|---|---|
| Feature | `feat/<short-description>` | `feat/add-more-services` |
| Bug fix | `fix/<short-description>` | `fix/missing-poster-fallback` |
| AI/Claude | `claude/<task-id>` | `claude/claude-md-mlwfg2fz2h2iwoxi-yz4iW` |
| Docs | `docs/<short-description>` | `docs/update-readme` |

### Commit Messages

Use the imperative mood, subject line under 72 characters:

```
Add Amediateka to streaming services list
Fix rating display when kp score is zero
Move API key to environment variable
```

For larger changes, add a blank line after the subject and a body:

```
Refactor search into a custom hook

Extracts handleSearch logic from page.js into useMovieSearch
to make the component easier to test in isolation.
```

### Pull Requests

- Keep PRs focused on a single concern
- Describe what changed and why
- Ensure lint passes (`npm run lint`) before requesting review

---

## AI Assistant Guidelines

When working in this repository as an AI assistant:

1. **Read before editing** — always read a file before modifying it
2. **Minimal changes** — only change what is necessary; do not refactor unrelated code
3. **No speculative features** — do not add functionality that was not requested
4. **Preserve inline style pattern** — do not introduce a CSS framework or CSS modules unless explicitly asked
5. **Environment variables** — never hard-code secrets; always use `process.env.*`
6. **Branch discipline** — develop on the branch specified in your task; never push to `main`/`master` without explicit permission
7. **Commit granularity** — prefer small, focused commits over large sweeping ones
8. **Update this file** — if you add new files, dependencies, or conventions, update the relevant sections here
