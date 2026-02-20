# Additional Architecture Recommendations

## 🔍 Issues Not Yet Fixed (Manual Review Needed)

### 1. **Forms Location (Architecture Violation)**

**Issue:** Forms are in `src/shared/forms/` but should be in their respective features

**Current:**
```
src/shared/forms/
├── accountForm.tsx      ❌ Should be in features/Account/components/
├── categoryForm.tsx     ❌ Should be in features/Categories/components/
├── loginForm.tsx        ❌ Should be in features/auth/components/
└── userForm/            ❌ Should be in features/Settings/components/
```

**Recommendation:**
Move forms to their respective feature folders. Keep only truly shared/generic form components in `shared/`.

---

### 2. **Query Keys Type Safety**

**Current Implementation:**
```typescript
export const QUERY_KEYS = {
  accounts: ['accounts'],
  categories: ['categories'],
  // ...
}
```

**Recommended:**
```typescript
export const QUERY_KEYS = {
  accounts: {
    all: ['accounts'] as const,
    lists: () => [...QUERY_KEYS.accounts.all, 'list'] as const,
    list: (filters: string) => [...QUERY_KEYS.accounts.lists(), { filters }] as const,
    details: () => [...QUERY_KEYS.accounts.all, 'detail'] as const,
    detail: (id: number) => [...QUERY_KEYS.accounts.details(), id] as const,
  },
} as const;
```

**Benefits:**
- Better cache invalidation control
- Type-safe query keys
- Hierarchical key structure

---

### 3. **Missing Loading States at App Level**

**Recommendation:** Add global loading indicator for route transitions

```typescript
// src/components/RouteLoading/routeLoading.tsx
export function RouteLoading() {
  const navigation = useNavigation();
  const isNavigating = navigation.state === 'loading';

  if (!isNavigating) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 animate-pulse z-50" />
  );
}
```

---

### 4. **React Query DevTools**

**Recommendation:** Add DevTools for development

```typescript
// src/app/providers.tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
      </AuthProvider>
      {ENV.isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
```

---

### 5. **API Response Interceptor for Better Error Messages**

**Current:** Only handles 401 errors

**Recommendation:** Handle common HTTP errors globally

```typescript
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    
    switch (status) {
      case 401:
        forceLogout();
        toast.error("Sessão expirou. Faça login novamente.");
        break;
      case 403:
        toast.error("Você não tem permissão para essa ação.");
        break;
      case 404:
        toast.error("Recurso não encontrado.");
        break;
      case 500:
        toast.error("Erro no servidor. Tente novamente mais tarde.");
        break;
      case 503:
        toast.error("Serviço temporariamente indisponível.");
        break;
    }
    
    return Promise.reject(error);
  }
);
```

---

### 6. **Input Validation Feedback**

**Recommendation:** Create reusable form field component

```typescript
// src/components/ui/FormField/formField.tsx
export function FormField({ 
  label, 
  error, 
  required, 
  children 
}: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
```

---

### 7. **API Request Logging (Development)**

**Recommendation:** Log requests in development for debugging

```typescript
// src/shared/api/httpClient.ts
if (ENV.isDevelopment) {
  httpClient.interceptors.request.use((config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, {
      params: config.params,
      data: config.data,
    });
    return config;
  });
}
```

---

### 8. **Optimistic Updates for Better UX**

**Example:**
```typescript
export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: accountService.createAccount,
    
    onMutate: async (newAccount) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.accounts });
      
      // Snapshot previous value
      const previousAccounts = queryClient.getQueryData(QUERY_KEYS.accounts);
      
      // Optimistically update
      queryClient.setQueryData(QUERY_KEYS.accounts, (old) => [...old, newAccount]);
      
      return { previousAccounts };
    },
    
    onError: (err, newAccount, context) => {
      // Rollback on error
      queryClient.setQueryData(QUERY_KEYS.accounts, context.previousAccounts);
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.accounts });
    },
  });
}
```

---

### 9. **Security: Consider httpOnly Cookies**

**Current:** Tokens in localStorage (vulnerable to XSS)

**Recommendation:** For production, use httpOnly cookies
- Backend sets httpOnly cookie with token
- Frontend doesn't need to handle token manually
- Axios automatically sends cookies

**Trade-offs:**
- ✅ More secure against XSS
- ❌ Vulnerable to CSRF (need CSRF tokens)
- ❌ Requires backend changes

---

### 10. **Pagination Component Abstraction**

**Recommendation:** Create reusable pagination hook

```typescript
// src/hooks/usePagination.ts
export function usePagination(initialPage = 1, initialPageSize = 10) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const goToPage = (newPage: number) => setPage(newPage);
  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const reset = () => setPage(initialPage);

  return {
    page,
    pageSize,
    setPageSize,
    goToPage,
    nextPage,
    prevPage,
    reset,
  };
}
```

---

### 11. **Performance: Code Splitting**

**Recommendation:** Lazy load feature modules

```typescript
// src/app/router.tsx
import { lazy } from 'react';

const Home = lazy(() => import('@/features/Home'));
const Account = lazy(() => import('@/features/Account/pages'));
// ... other lazy imports

export const router = createBrowserRouter([
  // ... routes with lazy components
]);

// Wrap in Suspense in App.tsx
<Suspense fallback={<LoadingSpinner />}>
  <RouterProvider router={router} />
</Suspense>
```

---

### 12. **Testing Setup**

**Recommendation:** Add test infrastructure

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
  },
});
```

---

### 13. **Accessibility Improvements**

**Checklist:**
- [ ] Add proper ARIA labels to interactive elements
- [ ] Ensure keyboard navigation works
- [ ] Add focus indicators
- [ ] Use semantic HTML
- [ ] Test with screen readers
- [ ] Add skip-to-content link

---

### 14. **CI/CD Pipeline**

**Recommended GitHub Actions workflow:**

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run build
```

---

### 15. **Bundle Size Monitoring**

**Recommendation:** Use `vite-plugin-bundle-analyzer`

```typescript
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    // ... other plugins
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

---

## 📚 Recommended Reading

1. **React Query Best Practices**: https://tkdodo.eu/blog/practical-react-query
2. **React Hook Form Performance**: https://react-hook-form.com/advanced-usage
3. **Vite Performance**: https://vitejs.dev/guide/performance.html
4. **TypeScript Best Practices**: https://typescript-tv.com/

---

## 🎯 Priority Implementation Order

### High Priority (Do First)
1. ✅ Environment variables (DONE)
2. ✅ Safe localStorage wrapper (DONE)
3. ✅ Error boundary (DONE)
4. ✅ Root route fix (DONE)
5. ✅ Move forms to feature folders (DONE)
6. ✅ Add React Query DevTools (DONE)

### Medium Priority
7. ✅ Improve query keys structure (DONE)
8. ✅ Add route loading states (DONE)
9. ✅ Enhance error interceptor (DONE)
10. Add request logging for dev

### Low Priority (Nice to Have)
11. Optimistic updates
12. Code splitting
13. Testing setup
14. CI/CD pipeline
15. Bundle size monitoring
