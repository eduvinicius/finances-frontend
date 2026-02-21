/**
 * Validates a Brazilian CPF (Cadastro de Pessoas Físicas)
 * @param cpf - The CPF string to validate (can include formatting characters like dots and dashes)
 * @returns true if the CPF is valid, false otherwise
 */
export function isValidCPF(cpf: string): boolean {
    if (!cpf) return false;

    // Remove any non-numeric characters
    const cleanedCPF = cpf.replaceAll(/\D/g, "");

    // Check if it has exactly 11 digits
    if (cleanedCPF.length !== 11) return false;

    // Check for known invalid patterns (all same digits)
    const invalidPatterns = [
        "00000000000",
        "11111111111",
        "22222222222",
        "33333333333",
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999",
    ];

    if (invalidPatterns.includes(cleanedCPF)) return false;

    // Calculate first verification digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += Number.parseInt(cleanedCPF.charAt(i)) * (10 - i);
    }
    let firstDigit = 11 - (sum % 11);
    if (firstDigit >= 10) firstDigit = 0;

    // Check first verification digit
    if (firstDigit !== Number.parseInt(cleanedCPF.charAt(9))) return false;

    // Calculate second verification digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += Number.parseInt(cleanedCPF.charAt(i)) * (11 - i);
    }
    let secondDigit = 11 - (sum % 11);
    if (secondDigit >= 10) secondDigit = 0;

    // Check second verification digit
    if (secondDigit !== Number.parseInt(cleanedCPF.charAt(10))) return false;

    return true;
}

/**
 * Formats a CPF string with dots and dashes
 * @param cpf - The CPF string to format
 * @returns The formatted CPF (XXX.XXX.XXX-XX) or the original string if invalid
 */
export function formatCPF(cpf: string): string {
    if (!cpf) return "";

    const cleanedCPF = cpf.replaceAll(/\D/g, "");

    if (cleanedCPF.length !== 11) return cpf;

    return cleanedCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function unformatCPF(formattedCPF: string): string {
    return formattedCPF.replaceAll(/\D/g, "");
}
