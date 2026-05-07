# MyFinances — Frontend

React 19 + TypeScript SPA for the MyFinances personal finance management app. Built with Vite, TanStack Query, React Hook Form + Zod, and shadcn/ui.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + TypeScript 5.9 |
| Build tool | Vite 7 |
| Routing | React Router 7 |
| Server state | TanStack React Query 5 |
| Forms | React Hook Form 7 + Zod 4 |
| HTTP client | Axios |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Charts | Chart.js + react-chartjs-2 |
| Notifications | Sonner |
| Date utils | date-fns |
| Theming | next-themes (dark mode) |

---

## Getting Started

### Prerequisites

- Node.js 20+
- A running instance of the [MyFinances backend](../finances-backend/)

### Setup

```bash
# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:5276/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### Running the Dev Server

```bash
npm run dev       # http://localhost:5173
npm run build     # TypeScript check + production build → ./dist
npm run preview   # Serve the production build locally
npm run lint      # Run ESLint
```

---

## Project Structure

```
src/
├── app/            → Router config, AppProviders wrapper
├── features/       → Domain feature modules
│   ├── Account/
│   ├── Categories/
│   ├── Transactions/
│   ├── Summary/
│   ├── Settings/
│   └── auth/
├── components/     → Global reusable UI (shadcn/ui wrappers, charts, sidebar)
├── shared/         → API client, types, Zod schemas, constants, mappers, contexts
├── hooks/          → Global hooks (useMobile, useErrorHandler, useSidebar, usePrivacy)
└── lib/            → Utility functions
```

### Feature Module Layout

Each feature under `src/features/` follows the same internal structure:

```
FeatureName/
├── api/        → Axios service calls
├── hooks/      → React Query hooks (useQuery / useMutation wrappers)
├── components/ → UI components scoped to this feature
└── pages/      → Route-level page components
```

---

## Key Conventions

### API & State

- All HTTP calls go through the Axios instance in `src/shared/api/httpClient.ts`.
- The auth interceptor in `src/shared/api/auth.interceptor.ts` attaches the JWT Bearer token to every request and triggers an auto-logout on `401`.
- Server state is managed exclusively with **TanStack React Query**. Query keys are defined in `src/shared/constants/queryKeys.ts` as factory functions — never inline strings.
- `refetchOnWindowFocus` is disabled globally; retries are disabled for 401/403 responses.

### Forms

- All forms use **React Hook Form** with **Zod** schemas from `src/shared/schemas/`.
- `400` validation errors from the API are displayed inline per field, not via toast.
- All other API errors (403, 404, 500, 503) are handled globally with Sonner toasts via the response interceptor.

### Routing

- Routes are defined in `src/app/router.tsx` with lazy-loaded page components.
- Route path constants live in `src/shared/constants/routes.cons.ts`.

### Enums

`TransactionType` and `AccountType` are numeric enums in `src/shared/enums/` and must stay in sync with the backend values.

### Components

- shadcn/ui components live in `src/components/ui/` and should not be edited directly — extend them with wrapper components.
- The `cn()` utility from `src/lib/utils.ts` is used for conditional class merging.

---

## Features

| Feature | Description |
|---|---|
| Authentication | Login, register, Google OAuth, password reset |
| Accounts | Create and manage financial accounts with balance tracking |
| Categories | Organize transactions with typed categories (Income / Expense) |
| Transactions | Full CRUD with filters, pagination, sorting, and Excel export |
| Summary | Dashboard with aggregated income/expense totals and charts |
| Settings | Profile management and preferences |
| Dark mode | System-aware with manual toggle via next-themes |
