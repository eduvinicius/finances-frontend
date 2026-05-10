/**
 * Extracts the user ID from a JWT token by decoding its payload.
 * Does NOT validate the signature — only used to read the `sub` claim
 * for UI-level guard logic. The backend enforces all real security.
 */
export function getUserIdFromToken(token: string | null): string | null {
  if (!token) return null;

  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = parts[1];
    // Pad base64url to standard base64
    const padded = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(padded.padEnd(padded.length + ((4 - (padded.length % 4)) % 4), '='));
    const parsed = JSON.parse(json) as Record<string, unknown>;

    const sub = parsed['sub'];
    return typeof sub === 'string' ? sub : null;
  } catch {
    return null;
  }
}
