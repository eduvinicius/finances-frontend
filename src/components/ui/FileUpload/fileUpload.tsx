import { useCallback, useState } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button/button";
import { 
    validateImageFile, 
    createImagePreviewUrl, 
    getAcceptedImageTypes,
    formatFileSize 
} from "@/shared/utils/fileValidation";

export interface FileUploadProps {
    id: string;
    label: string;
    value?: File | null;
    onChange: (file: File | null) => void;
    error?: string;
    helperText?: string;
    disabled?: boolean;
}

export function FileUpload({ 
    id, 
    label, 
    value, 
    onChange, 
    error, 
    helperText,
    disabled = false 
}: Readonly<FileUploadProps>) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);

    const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        
        if (!file) {
            setPreviewUrl(null);
            setValidationError(null);
            onChange(null);
            return;
        }

        const validation = validateImageFile(file);
        
        if (!validation.isValid) {
            setValidationError(validation.error);
            setPreviewUrl(null);
            onChange(null);
            // Reset the input
            event.target.value = "";
            return;
        }

        setValidationError(null);
        
        try {
            const url = await createImagePreviewUrl(file);
            setPreviewUrl(url);
            onChange(file);
        } catch {
            setValidationError("Erro ao carregar preview da imagem");
            setPreviewUrl(null);
            onChange(null);
        }
    }, [onChange]);

    const handleRemoveFile = useCallback(() => {
        setPreviewUrl(null);
        setValidationError(null);
        onChange(null);
    }, [onChange]);

    const displayError = error || validationError;

    return (
        <Field>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            
            <div className="space-y-4">
                {/* Upload Area */}
                <div className="relative">
                    <input
                        id={id}
                        type="file"
                        accept={getAcceptedImageTypes()}
                        onChange={handleFileChange}
                        disabled={disabled}
                        className="hidden"
                    />
                    
                    {previewUrl ? (
                        <div className="relative w-full h-48 border-2 border-gray-600 rounded-lg overflow-hidden">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleRemoveFile}
                                disabled={disabled}
                                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 border-red-600"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ) : (
                        <label
                            htmlFor={id}
                            className={`
                                flex flex-col items-center justify-center
                                w-full h-32 px-4 py-6
                                border-2 border-dashed rounded-lg
                                cursor-pointer transition-colors
                                ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-primary"}
                                ${displayError ? "border-red-500" : "border-gray-600"}
                            `}
                        >
                            <Upload className="w-8 h-8 mb-2 text-gray-400" />
                            <p className="text-sm text-gray-400">
                                Clique para selecionar uma imagem
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                PNG, JPG ou JPEG (máx. 1MB)
                            </p>
                        </label>
                    )}
                </div>

                {/* File Info */}
                {value && !validationError && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <ImageIcon className="w-4 h-4" />
                        <span>{value.name}</span>
                        <span className="text-gray-500">({formatFileSize(value.size)})</span>
                    </div>
                )}

                {/* Error or Helper Text */}
                <FieldDescription className={displayError ? "text-red-500" : ""}>
                    {displayError || helperText || ""}
                </FieldDescription>
            </div>
        </Field>
    );
}
