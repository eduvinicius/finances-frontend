import { useState } from "react";
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
import { CategoriesList,  CategoriesListSkeleton  } from "../components";
import { toast } from "sonner";

export function Categories() {

    const { data, isLoading, error } = useCategories();
    const { mutate, isPending } = useCreateCategory();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const handleFormSubmit = (formData: CategoryFormValues) => {
        mutate(formData, {
            onSuccess: () => {
                setIsDialogOpen(false);
            },
        });
    };

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
            {isLoading ? <CategoriesListSkeleton /> : <CategoriesList data={data ?? []} />}
            {data?.length === 0 && !isLoading && (
                <p className="text-center text-muted-foreground mt-10">Nenhuma categoria encontrada. Crie sua primeira categoria!</p>
            )}
            {error && toast.error(`Erro ao carregar categorias: ${error.message}`)}
        </>
    );
}