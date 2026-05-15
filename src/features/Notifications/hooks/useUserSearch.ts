import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { adminUserService } from "@/features/admin/api/adminUserService";

export function useUserSearch(name: string) {
  return useQuery({
    queryKey: QUERY_KEYS.adminUsers.search(name),
    queryFn: () => adminUserService.searchByName(name),
    enabled: name.trim().length >= 2,
    staleTime: 30_000,
  });
}
