# CLAUDE.md

This file provides guidance to AI assistants (Claude and others) working with this repository.

## Repository Status

This repository is currently **empty** — no source files, no build configuration, and no commit history exist yet. The information below documents the current state and establishes conventions for future development.

**Remote:** `dzigurdarahmet-byte/SergeySS`
**Active Branch:** `claude/claude-md-mlwea94obhy2v8za-IkaEq`

---

## Project Overview

> **TODO:** Update this section once the project purpose and stack are defined.

This section should describe:
- What the project does and why it exists
- The primary users or consumers of this software
- Any relevant domain context

---

## Repository Structure

> **TODO:** Update as the project structure is established.

Once source files are added, document the layout here. Example:

```
/
├── src/           # Application source code
├── tests/         # Test files
├── docs/          # Project documentation
├── .github/       # GitHub Actions workflows and templates
├── CLAUDE.md      # This file — AI assistant guidance
└── README.md      # Human-facing project overview
```

---

## Development Setup

> **TODO:** Fill in once a language/framework is chosen.

Document:
1. Prerequisites and required tooling versions
2. How to install dependencies
3. How to run the application locally
4. Any required environment variables or secrets

---

## Build and Run Commands

> **TODO:** Fill in once build tooling is established.

Common patterns to document:

| Task             | Command               |
|------------------|-----------------------|
| Install deps     | `npm install` / `pip install -r requirements.txt` / etc. |
| Run dev server   | `npm run dev` / etc.  |
| Build            | `npm run build` / etc.|
| Run tests        | `npm test` / etc.     |
| Lint             | `npm run lint` / etc. |
| Format           | `npm run format` / etc.|

---

## Testing

> **TODO:** Fill in once a test framework is chosen.

Describe:
- The testing framework and runner
- How to run the full test suite
- How to run a single test file or test case
- Conventions for test file naming and placement
- What test coverage thresholds are enforced (if any)

---

## Code Style and Conventions

> **TODO:** Update once linting and formatting tools are configured.

Until tooling is established, follow these general principles:

- **Consistency** — Match the style of surrounding code
- **Clarity** — Prefer readable code over clever code
- **Minimal changes** — Only modify what is necessary for the task
- **No unnecessary comments** — Only comment logic that is non-obvious
- **No speculative abstractions** — Solve the current problem; avoid over-engineering

---

## Git Workflow

### Branch Naming

| Type        | Pattern                        | Example                         |
|-------------|--------------------------------|---------------------------------|
| Feature     | `feat/<short-description>`     | `feat/user-authentication`      |
| Bug fix     | `fix/<short-description>`      | `fix/null-pointer-on-login`     |
| AI/Claude   | `claude/<task-id>`             | `claude/claude-md-mlwea94obhy2v8za-IkaEq` |
| Docs        | `docs/<short-description>`     | `docs/update-readme`            |

### Commit Messages

Use the imperative mood and keep the subject line under 72 characters:

```
Add user authentication module
Fix null pointer exception on login page
Update CLAUDE.md with project structure
```

For larger changes, add a blank line after the subject followed by a body:

```
Refactor database connection pooling

Switch from a single shared connection to a pool to improve
concurrency under load. Configurable via DATABASE_POOL_SIZE env var.
```

### Pull Requests

- Keep PRs focused on a single concern
- Provide a clear description of what changed and why
- Link to any related issues
- Ensure all tests and linters pass before requesting review

---

## AI Assistant Guidelines

When working in this repository as an AI assistant:

1. **Read before editing** — Always read a file before modifying it
2. **Minimal changes** — Make only the changes needed to fulfill the task; avoid refactoring unrelated code
3. **No speculative features** — Do not add functionality that was not asked for
4. **Preserve existing style** — Match indentation, naming, and structure of the surrounding code
5. **Update this file** — If you establish new conventions, tooling, or project structure, update the relevant sections in this file
6. **Branch discipline** — Develop on the branch specified in your task; never push to `main` or `master` without explicit permission
7. **Commit granularity** — Prefer small, focused commits over large sweeping ones
8. **Security** — Never commit secrets, credentials, tokens, or private keys; always use environment variables or a secrets manager

---

## Adding a New Language or Framework

When the technology stack is chosen, update this file with:

- The specific language version and runtime requirements
- The package manager and lockfile (e.g., `package-lock.json`, `poetry.lock`)
- Linting and formatting tools and their configuration files
- How the test runner is invoked
- Any code generation or build steps that must run before tests

---

## Contact and Ownership

> **TODO:** Add team contacts, on-call information, or links to internal documentation once available.
