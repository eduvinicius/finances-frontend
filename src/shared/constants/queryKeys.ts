/**
 * Hierarchical Query Keys with Factory Functions
 * Following React Query best practices for better cache invalidation
 * @see https://tkdodo.eu/blog/effective-react-query-keys
 */

import type { AccountFiltersValues } from "../types/account.types";
import type { CategoriesFiltersValues } from "../types/category.type";
import type { IPaginatedRequest } from "../types/pagination.types";
import type { TransactionFiltersValues } from "../types/transactions.types";

export const QUERY_KEYS = {

  auth: {
    all: ['auth'] as const,
    currentUser: ['current-user'] as const,
    login: () => [...QUERY_KEYS.auth.all, 'login'] as const,
    getCurrentUser: () => [...QUERY_KEYS.auth.all, 'current-user'] as const,
    updateUser: () => [...QUERY_KEYS.auth.all, 'update-user'] as const,
    updateProfileImage: () => [...QUERY_KEYS.auth.all, 'update-profile-image'] as const,
  },

  accounts: {
    all: ['accounts'] as const,
    getAll: () => [...QUERY_KEYS.accounts.all] as const,
    paginated: () => [...QUERY_KEYS.accounts.all, 'paginated'] as const,
    paginatedList: (pagination: IPaginatedRequest, filters?: AccountFiltersValues) =>
      [...QUERY_KEYS.accounts.paginated(), pagination, filters] as const,
  },

  categories: {
    all: ['categories'] as const,
    getAll: () => [...QUERY_KEYS.categories.all] as const,
    paginated: () => [...QUERY_KEYS.categories.all, 'paginated'] as const,
    paginatedList: (pagination: IPaginatedRequest, filters?: CategoriesFiltersValues) =>
      [...QUERY_KEYS.categories.paginated(), pagination, filters] as const,
  },

  transactions: {
    all: ['transactions'] as const,
    filtered: () => [...QUERY_KEYS.transactions.all, 'getAll'] as const,
    filteredList: (pagination: IPaginatedRequest, filters?: TransactionFiltersValues) =>
      [...QUERY_KEYS.transactions.filtered(), pagination, filters] as const,
    byId: (id: string) => [...QUERY_KEYS.transactions.all, id] as const,
  }
} as const;

export const getApiEndpoint = (queryKey: readonly unknown[]): string => {
  return queryKey.filter(item => typeof item === 'string').join('/');
};
