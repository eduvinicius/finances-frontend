/**
 * Hierarchical Query Keys with Factory Functions
 * Following React Query best practices for better cache invalidation
 * @see https://tkdodo.eu/blog/effective-react-query-keys
 */

import type { AccountFiltersValues } from "../types/account.types";
import type { CategoriesFiltersValues } from "../types/category.type";
import type { IPaginatedRequest } from "../types/pagination.types";

export const QUERY_KEYS = {

  auth: {
    all: ['auth'] as const,
    login: () => [...QUERY_KEYS.auth.all, 'login'] as const,
  },

  accounts: {
    all: ['accounts'] as const,
    lists: () => [...QUERY_KEYS.accounts.all, 'list'] as const,
    list: (pagination: IPaginatedRequest, filters?: AccountFiltersValues) =>
      [...QUERY_KEYS.accounts.lists(), pagination, filters] as const,
    details: () => [...QUERY_KEYS.accounts.all, 'detail'] as const,
    detail: (id: number) => [...QUERY_KEYS.accounts.details(), id] as const,
  },

  categories: {
    all: ['categories'] as const,
    lists: () => [...QUERY_KEYS.categories.all, 'list'] as const,
    list: (pagination: IPaginatedRequest, filters?: CategoriesFiltersValues) =>
      [...QUERY_KEYS.categories.lists(), pagination, filters] as const,
    details: () => [...QUERY_KEYS.categories.all, 'detail'] as const,
    detail: (id: number) => [...QUERY_KEYS.categories.details(), id] as const,
  },
} as const;

export const getApiEndpoint = (queryKey: readonly unknown[]): string => {
  return queryKey[0] as string;
};
