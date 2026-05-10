import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { IPaginatedBaseResponse } from "@/shared/types/pagination.types";
import type { AdminUserFilter, AdminUserListItem } from "@/shared/types/adminUser.types";
import { adminUserService } from "../api/adminUserService";

export function useAdminUsers(
  filters: AdminUserFilter
): UseQueryResult<IPaginatedBaseResponse<AdminUserListItem[]>, Error> {
  return useQuery({
    queryKey: QUERY_KEYS.adminUsers.list(filters),
    queryFn: () => adminUserService.getAll(filters),
  });
}
