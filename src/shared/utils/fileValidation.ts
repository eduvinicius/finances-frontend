const MAX_FILE_SIZE = 1024 * 1024; // 1MB in bytes
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export interface FileValidationError {
    isValid: false;
    error: string;
}

export interface FileValidationSuccess {
    isValid: true;
    error?: null;
}

export type FileValidationResult = FileValidationError | FileValidationSuccess;

/**
 * Validates if a file is an accepted image type
 * @param file - The file to validate
 * @returns true if the file type is accepted
 */
export function isValidImageType(file: File): boolean {
    return ACCEPTED_IMAGE_TYPES.includes(file.type);
}

/**
 * Validates if a file size is within the maximum allowed
 * @param file - The file to validate
 * @returns true if the file size is valid
 */
export function isValidFileSize(file: File): boolean {
    return file.size <= MAX_FILE_SIZE;
}

/**
 * Formats file size in bytes to a human-readable format
 * @param bytes - The size in bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Validates an image file for type and size
 * @param file - The file to validate
 * @returns Validation result with error message if invalid
 */
export function validateImageFile(file: File | null): FileValidationResult {
    if (!file) {
        return {
            isValid: false,
            error: "Nenhum arquivo selecionado",
        };
    }

    if (!isValidImageType(file)) {
        return {
            isValid: false,
            error: "O arquivo deve ser uma imagem do tipo JPEG, JPG ou PNG",
        };
    }

    if (!isValidFileSize(file)) {
        return {
            isValid: false,
            error: `O tamanho do arquivo deve ser menor que ${formatFileSize(MAX_FILE_SIZE)}`,
        };
    }

    return {
        isValid: true,
    };
}

/**
 * Creates a preview URL for an image file
 * @param file - The file to create a preview for
 * @returns Data URL for the image preview
 */
export function createImagePreviewUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = () => {
            if (typeof reader.result === "string") {
                resolve(reader.result);
            } else {
                reject(new Error("Failed to read file"));
            }
        };
        
        reader.onerror = () => {
            reject(new Error("Error reading file"));
        };
        
        reader.readAsDataURL(file);
    });
}

/**
 * Gets the accepted image types as a string for input accept attribute
 * @returns Comma-separated string of accepted MIME types
 */
export function getAcceptedImageTypes(): string {
    return ACCEPTED_IMAGE_TYPES.join(",");
}
