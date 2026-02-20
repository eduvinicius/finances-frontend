# Architecture Documentation

## Project Structure

This project follows a **feature-based architecture** with clear separation of concerns.

### Directory Structure

```
src/
├── app/                    # Application configuration
│   ├── router.tsx         # Route definitions
│   ├── providers.tsx      # Global providers (Query, Auth)
│   └── privateRoute.tsx   # Auth guard component
├── features/              # Feature modules
│   └── [FeatureName]/
│       ├── api/          # API service layer
│       ├── hooks/        # Feature-specific React hooks
│       ├── components/   # Feature-specific components
│       └── pages/        # Page components
├── components/           # Shared/reusable components
├── shared/              # Shared utilities
│   ├── api/            # HTTP client & interceptors
│   ├── constants/      # App-wide constants
│   ├── contexts/       # Global contexts
│   ├── schemas/        # Zod validation schemas
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── hooks/              # Global custom hooks
└── lib/                # Third-party library configurations
```

## Design Patterns

### 1. Feature-Based Architecture
Each feature is self-contained with its own:
- API services
- React Query hooks
- Components
- Pages

**Benefits:**
- Easy to locate feature-specific code
- Better code organization
- Scalable structure

### 2. API Layer Pattern
```typescript
// Service layer (api/accountService.ts)
export const accountService = {
  async getAccountsPaginated(...) {
    const response = await httpClient.get(...);
    return response.data;
  }
}

// Hook layer (hooks/useGetAccounts.ts)
export function useGetAccounts() {
  return useQuery({
    queryKey: QUERY_KEYS.accounts,
    queryFn: () => accountService.getAccountsPaginated(...)
  });
}

// Component usage
const { data, isLoading } = useGetAccounts();
```

**Benefits:**
- Separation of data fetching logic
- Easy to test
- Reusable across components

### 3. Form Handling Pattern
- **React Hook Form** for form state
- **Zod** for validation schemas
- Type-safe forms with TypeScript

### 4. Error Handling Strategy

#### Global Error Boundary
Catches React component errors and displays fallback UI.

#### Custom Error Hook
```typescript
const { handleError } = useErrorHandler();

try {
  // ... operation
} catch (error) {
  handleError(error, { prefix: 'Erro ao criar conta' });
}
```

#### HTTP Interceptor
Handles 401 errors globally and forces logout.

## Best Practices

### 1. Environment Variables
- All environment variables prefixed with `VITE_`
- Type-safe access through `src/shared/constants/env.ts`
- Never commit `.env` file

### 2. Type Safety
- Use TypeScript for all files
- Define types in `src/shared/types/`
- Use Zod schemas for runtime validation

### 3. State Management
- **React Query** for server state
- **Context API** for global client state (auth, theme)
- **Local state** for component-specific state

### 4. Code Organization
- One component per file
- Export from `index.ts` for cleaner imports
- Use path aliases (`@/`) for imports

### 5. Error Handling
- Always use try-catch for localStorage operations
- Use `useErrorHandler` hook for consistent error messages
- Log errors for debugging

### 6. Security
- Tokens stored in localStorage (consider httpOnly cookies for production)
- Auth interceptor adds token to requests
- 401 responses trigger automatic logout

## Technology Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router 7** - Routing
- **TanStack Query** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Axios** - HTTP client
- **TailwindCSS** - Styling
- **Sonner** - Toast notifications

## Setup

1. Copy `.env.example` to `.env`
2. Configure environment variables
3. Install dependencies: `npm install`
4. Run development server: `npm run dev`

## Future Improvements

- [ ] Add React Query DevTools
- [ ] Implement offline support with Service Workers
- [ ] Add E2E tests with Playwright
- [ ] Implement theme switching
- [ ] Add loading states at app level
- [ ] Consider migrating from localStorage to httpOnly cookies for tokens
- [ ] Add request/response logging in development
- [ ] Implement optimistic updates for mutations
