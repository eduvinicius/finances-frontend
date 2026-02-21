import { useCallback, useState } from "react";
import { Upload, User } from "lucide-react";
import { Button } from "@/components/ui/Button/button";
import {
    validateImageFile,
    createImagePreviewUrl,
    getAcceptedImageTypes,
} from "@/shared/utils/fileValidation";
import { useUploadProfileImage } from "../hooks/useUploadProfileImage";

interface ProfileImageUploadProps {
    currentImageUrl?: string;
}

export function ProfileImageUpload({ currentImageUrl }: Readonly<ProfileImageUploadProps>) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);
    
    const { mutate: uploadImage, isPending } = useUploadProfileImage();

    const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;

        if (!file) {
            setPreviewUrl(null);
            setValidationError(null);
            setSelectedFile(null);
            return;
        }

        const validation = validateImageFile(file);

        if (!validation.isValid) {
            setValidationError(validation.error);
            setPreviewUrl(null);
            setSelectedFile(null);
            event.target.value = "";
            return;
        }

        setValidationError(null);

        try {
            const url = await createImagePreviewUrl(file);
            setPreviewUrl(url);
            setSelectedFile(file);
        } catch {
            setValidationError("Erro ao carregar preview da imagem");
            setPreviewUrl(null);
            setSelectedFile(null);
        }
    }, []);

    const handleRemoveFile = useCallback(() => {
        setPreviewUrl(null);
        setValidationError(null);
        setSelectedFile(null);
    }, []);

    const handleUpload = useCallback(() => {
        if (!selectedFile) return;

        uploadImage(selectedFile, {
            onSuccess: () => {
                setSelectedFile(null);
                setPreviewUrl(null);
            }
        });
    }, [selectedFile, uploadImage]);

    const displayImageUrl = previewUrl || currentImageUrl;

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Foto de Perfil</h3>
            
            <div className="flex flex-col items-center gap-4">
                {/* Image Display */}
                <div className="relative">
                    {displayImageUrl ? (
                        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-600">
                            <img
                                src={displayImageUrl}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-40 h-40 rounded-full bg-gray-700 flex items-center justify-center border-4 border-gray-600">
                            <User className="w-20 h-20 text-gray-400" />
                        </div>
                    )}
                </div>

                {/* Upload Input */}
                <div className="flex flex-col items-center gap-2 w-full max-w-md">
                    <input
                        id="profile-image-upload"
                        type="file"
                        accept={getAcceptedImageTypes()}
                        onChange={handleFileChange}
                        disabled={isPending}
                        className="hidden"
                    />
                    
                    {selectedFile ? (
                        <div className="flex gap-2 w-full">
                            <Button
                                type="button"
                                onClick={handleUpload}
                                disabled={isPending}
                                className="flex-1"
                            >
                                {isPending ? "Enviando..." : "Salvar Foto"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleRemoveFile}
                                disabled={isPending}
                            >
                                Cancelar
                            </Button>
                        </div>
                    ) : (
                        <label
                            htmlFor="profile-image-upload"
                            className={`
                                flex items-center justify-center gap-2
                                px-4 py-2 rounded-lg
                                border-2 border-dashed border-gray-600
                                cursor-pointer transition-colors
                                hover:border-primary hover:bg-gray-800
                                ${isPending ? "opacity-50 cursor-not-allowed" : ""}
                            `}
                        >
                            <Upload className="w-5 h-5" />
                            <span>Escolher nova foto</span>
                        </label>
                    )}

                    {/* Helper Text */}
                    <p className="text-xs text-gray-500 text-center">
                        PNG, JPG ou JPEG (máx. 1MB)
                    </p>

                    {/* Error Message */}
                    {validationError && (
                        <p className="text-sm text-red-500 text-center">
                            {validationError}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
