/**
 * Decodes the payload of a JWT token (base64url middle segment).
 * Does NOT validate the signature — only used to read claims
 * for UI-level logic. The backend enforces all real security.
 */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = parts[1];
    // Pad base64url to standard base64
    const padded = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(padded.padEnd(padded.length + ((4 - (padded.length % 4)) % 4), '='));
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/**
 * Extracts the user ID from a JWT token by decoding its payload.
 * Does NOT validate the signature — only used to read the `sub` claim
 * for UI-level guard logic. The backend enforces all real security.
 */
export function getUserIdFromToken(token: string | null): string | null {
  if (!token) return null;
  const parsed = decodeJwtPayload(token);
  if (!parsed) return null;
  const sub = parsed['sub'];
  return typeof sub === 'string' ? sub : null;
}

/**
 * Extracts the role from a JWT token.
 * Reads the standard ASP.NET Core role claim key.
 * Does NOT validate the signature — only used for UI rendering hints.
 * The backend enforces all real access control.
 */
export function getRoleFromToken(token: string | null): string | null {
  if (!token) return null;
  const parsed = decodeJwtPayload(token);
  if (!parsed) return null;

  // ASP.NET Core identity role claim
  const roleClaimKey = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
  const role = parsed[roleClaimKey] ?? parsed['role'];
  return typeof role === 'string' ? role : null;
}
