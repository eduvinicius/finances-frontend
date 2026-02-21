/**
 * Formats a phone number string to Brazilian format
 * @param value - The phone number string to format
 * @returns The formatted phone number
 */
export function formatPhoneNumber(value: string): string {
    if (!value) return "";

    // Remove all non-numeric characters
    const numbers = value.replaceAll(/\D/g, "");

    // Apply mask based on length
    if (numbers.length <= 2) {
        return numbers;
    }
    if (numbers.length <= 6) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }
    if (numbers.length <= 10) {
        // Landline format: (XX) XXXX-XXXX
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`;
    }
    // Mobile format: (XX) XXXXX-XXXX
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
}

/**
 * Removes formatting from a phone number, leaving only digits
 * @param value - The formatted phone number
 * @returns The phone number with only digits
 */
export function unformatPhoneNumber(value: string): string {
    return value.replaceAll(/\D/g, "");
}

/**
 * Validates a Brazilian phone number
 * @param phoneNumber - The phone number string to validate (can include formatting)
 * @returns true if the phone number is valid, false otherwise
 */
export function isValidPhoneNumber(phoneNumber: string): boolean {
    if (!phoneNumber) return false;

    // Remove all non-numeric characters
    const numbers = phoneNumber.replaceAll(/\D/g, "");

    // Brazilian phone numbers should have 10 digits (landline) or 11 digits (mobile)
    return numbers.length === 10 || numbers.length === 11;
}
