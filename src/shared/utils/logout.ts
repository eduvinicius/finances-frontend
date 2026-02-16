export function forceLogout() {
  localStorage.removeItem("userData");
  globalThis.location.href = "/login";
}
