import { STORAGE_KEYS } from "./storage";

export function forceLogout() {
  localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  globalThis.location.href = "/login";
}
