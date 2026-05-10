import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { AdminUserDetail } from "@/shared/types/adminUser.types";
import { adminUserService } from "../api/adminUserService";

export function useAdminUserDetail(id: string | null): UseQueryResult<AdminUserDetail, Error> {
  return useQuery({
    queryKey: QUERY_KEYS.adminUsers.detail(id ?? ''),
    queryFn: () => adminUserService.getById(id ?? ''),
    enabled: Boolean(id),
  });
}
