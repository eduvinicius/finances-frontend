# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

**React 19** · **TypeScript 5.9** (strict) · **Vite 7** · React Router 7 · TanStack React Query 5 · React Hook Form 7 + Zod 4 · Axios · Tailwind CSS 4 · shadcn/ui (New York style) · Chart.js / react-chartjs-2 · date-fns · Sonner (toasts)

## Commands

```bash
npm run dev       # dev server → http://localhost:5173
npm run build     # type-check + production build
npm run lint      # ESLint
```

## Feature Module Structure

Each feature under `src/features/<Feature>/` follows this layout:

```
api/          → service object with typed Axios calls (e.g. accountService)
hooks/        → React Query useQuery / useMutation wrappers
components/   → feature-specific UI components
pages/        → route-level page components
```

Shared, cross-feature concerns live in `src/shared/`:

| Folder | Contents |
|---|---|
| `api/` | `httpClient.ts` (Axios instance) + `auth.interceptor.ts` (side-effect import) |
| `types/` | TypeScript interfaces for every domain model and UI contract |
| `schemas/` | Zod schemas for form validation (one file per resource) |
| `constants/` | `queryKeys.ts`, `routes.cons.ts`, enum option lists, env |
| `mappers/` | Entity → UI model transformations |
| `utils/` | `storage.ts` (localStorage wrapper), `logout.ts`, masks, validators |

## State Management

- **Server state**: TanStack React Query. All query keys are defined in `src/shared/constants/queryKeys.ts` using factory functions — always use those, never inline strings.
- **Auth state**: `AuthContext` from `src/features/auth/context/authContext.tsx`, provided at the root in `AppProviders`.
- **No global state library** — local component state + React Query covers everything else.

## Authentication

JWT stored in `localStorage` via `storage.set(STORAGE_KEYS.TOKEN, token)`. The request interceptor in `src/shared/api/auth.interceptor.ts` reads the token and attaches `Authorization: Bearer <token>` automatically. It is loaded as a side-effect import in `src/main.tsx` — it must stay there.

## HTTP & Error Handling

- Base URL comes from `ENV.API_BASE_URL` (`src/shared/constants/env.ts`), sourced from `VITE_API_BASE_URL` in `.env` (required — app won't reach the backend without it).
- The response interceptor auto-toasts on **401** (forces logout), **403**, **404**, **500**, **503**.
- **400 validation errors are not auto-toasted** — individual API call sites handle them (typically showing field-level errors via React Hook Form).
- React Query is configured with `refetchOnWindowFocus: false`; retries are disabled for 401/403.

## Forms

All forms use **React Hook Form** with a **Zod** resolver. The Zod schema lives in `src/shared/schemas/`. Submit handlers call the service function directly and use a `useMutation` hook for loading/error state.

## Routing

Routes are defined in `src/app/router.tsx` with lazy-loaded page components. Protected routes are wrapped in the `Layout` feature component which checks `AuthContext`. Route constants are in `src/shared/constants/routes.cons.ts`.

## Gotchas

- **Never access `localStorage` directly** — always use the `storage` util from `src/shared/utils/storage.ts` to avoid silent parse errors.
- `auth.interceptor.ts` registers itself via side-effects — importing it anywhere else would double-register the interceptors. Only `main.tsx` should import it.
- Query key factories in `QUERY_KEYS` must be used for both `useQuery` and `invalidateQueries`; mismatched keys silently fail to invalidate the cache.
- `TransactionType` and `AccountType` are numeric enums that must match the backend values exactly — see `src/shared/enums/`.
- shadcn/ui components live in `src/components/ui/` and must not be edited directly; extend them with wrapper components instead.
