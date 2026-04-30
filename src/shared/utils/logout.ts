import { queryClient } from "@/lib/queryClient";
import { STORAGE_KEYS } from "./storage";

export function forceLogout() {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  queryClient.clear();
  globalThis.location.href = "/login";
}
