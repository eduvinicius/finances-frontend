import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../features/Settings/api/userService";

export function useUser() {
    return useQuery({
        queryKey: QUERY_KEYS.auth.getCurrentUser(),
        queryFn: userService.getCurrentUser,
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 15,
        retry: false,
    });
}