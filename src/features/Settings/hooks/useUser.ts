import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../api/userService";

export function useUser() {
    return useQuery({
        queryKey: QUERY_KEYS.auth.getCurrentUser(),
        queryFn: userService.getCurrentUser,
    });
}