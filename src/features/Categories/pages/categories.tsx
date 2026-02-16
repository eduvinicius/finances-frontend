import { useEffect, useState } from "react";
import { useCategories } from "../hooks/useCategories";
import { Button } from "@/components/ui/Button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog";
import { CategoryForm } from "@/shared/forms/categoryForm";
import type { CategoryFormValues } from "@/shared/types/categoryForm.type";
import { useCreateCategory } from "../hooks/useCreateCategory";
import { Spinner } from "@/components/ui/Spinner";

export function Categories() {

    const { data, isLoading } = useCategories();
    const { mutate, isPending } = useCreateCategory();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    
    useEffect(() => {
        if (data) {
            console.log("Categories:", data);
        }
    }, [data]);

    const handleFormSubmit = (formData: CategoryFormValues) => {
        mutate(formData, {
            onSuccess: () => {
            setIsDialogOpen(false);
            },
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Loading categories...</p>
            </div>
        );
    }

    return (
        <>
        <header className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-center">Categorias</h1>
            <Dialog 
                open={isDialogOpen} 
                onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button>Nova Categoria</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Criar Nova Categoria</DialogTitle>
                        <DialogDescription>
                            Preencha os campos abaixo para criar uma nova categoria.
                        </DialogDescription>
                    </DialogHeader>
                    {isPending ? (
                        <Spinner className="mx-auto my-4 w-10 h-10" />
                    ) : (
                        <CategoryForm onSubmit={handleFormSubmit} />
                    )}
                </DialogContent>
            </Dialog>
        </header>
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            {/* // Aqui você pode renderizar a lista de categorias usando os dados obtidos do hook useCategories */}
        </div>
        </>
    );
}