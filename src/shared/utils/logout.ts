import { queryClient } from "@/lib/queryClient";
import { storage, STORAGE_KEYS } from "./storage";

export function forceLogout() {
  storage.remove(STORAGE_KEYS.TOKEN);
  queryClient.clear();
  globalThis.location.href = "/login";
}
