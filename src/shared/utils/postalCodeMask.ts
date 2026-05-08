export function formatPostalCode(value: string): string {
  if (!value) return "";
  const digits = value.replaceAll(/\D/g, "").slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export function unformatPostalCode(value: string): string {
  return value.replaceAll(/\D/g, "");
}
