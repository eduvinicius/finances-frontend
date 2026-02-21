import { STORAGE_KEYS } from "./storage";

export function forceLogout() {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  globalThis.location.href = "/login";
}
