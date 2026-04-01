# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (port 3000)
npm run build     # Production build
npm run lint      # ESLint
npm run typecheck # TypeScript type check
```

The frontend connects to a backend API at `http://localhost:5001/api` (configured in `.env` as `NEXT_PUBLIC_API_URL`).

## Architecture

**Droites numériques** is a Next.js app for French school children (CE1/CE2, ages 9-11) to practice math exercises on number lines. It has two roles: teachers (dashboard to manage exercise lists) and students (practice mode).

### Key patterns

- **React Query** handles all server state (fetching, caching, mutations). Service hooks live in `services/`.
- **localStorage** persists the authenticated user via `hooks/useCurrentUser.ts`. Authentication uses HTTP Basic Auth with Base64-encoded credentials.
- **Dynamic imports with `ssr: false`** are used for client-only page components (see `app/*/page.tsx` files).
- Protected routes use `components/system/AuthenticatedRoute.tsx`.

### Data flow

1. `useCurrentUser` stores the logged-in user in localStorage
2. `services/users.ts` — `useUser` hook handles login (GET /users with Basic Auth)
3. `services/exerciseList.ts` — hooks for fetching, saving, deleting exercise lists
4. `utils/getAuthHeader.ts` builds the Authorization header from stored credentials

### Exercise system

`utils/getExercise.ts` generates randomized `LineGraphExercise` objects:

- **CE1**: start 0-900, steps from [1,2,5,10,100], 2-10 segments
- **CE2**: start 0-10000, steps from [1,2,5,10,100,1000], 2-10 segments

The `LineGraphExercise` component renders a number line with a question mark at `questionPosition`, revealing the answer on demand.

### UI conventions (from README)

Button colors carry meaning:

- Blue → navigation
- Indigo/Purple → authorization actions
- White/Gray → go back / neutral
- Green → positive action
- Red → negative/destructive action
