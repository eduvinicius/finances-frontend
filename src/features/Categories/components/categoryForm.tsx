import { Button } from "@/components/ui/Button";
import { FieldGroup, FieldSet } from "@/components/ui/Field";
import { categorySchema } from "@/shared/schemas/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TRANSACTION_TYPE_OPTIONS } from "@/shared/constants/transactionTypeOptions.const";
import type { CategoryFormValues } from "@/shared/types/category.type";
import type { IFormBaseProps } from "@/shared/types/formBase.types";
import { FormField, TextAreaFormField } from "@/components/FieldForms";
import { SelectFormField } from "@/components/FieldForms/selectFormField";

export function CategoryForm({ 
    onSubmit, 
    loading 
}: Readonly<IFormBaseProps<CategoryFormValues>>) {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        mode: "onTouched",
        defaultValues: {
            name: "",
            description: "",
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldSet className="space-y-4">
                <FieldGroup>
                    <FormField
                        id="name"
                        label="Nome"
                        type="text"
                        placeholder="Digite o nome da categoria"
                        error={errors.name?.message}
                        control={control}
                        fieldName="name"
                    />

                    <TextAreaFormField
                        id="description"
                        label="Descrição"
                        placeholder="Digite a descrição da categoria"
                        error={errors.description?.message}
                        control={control}
                        fieldName="description"
                    />

                    <SelectFormField<CategoryFormValues>
                        id="type"
                        label="Tipo de Transação"
                        placeholder="Selecione o tipo de transação"
                        fieldName="type"
                        control={control}
                        options={TRANSACTION_TYPE_OPTIONS ?? []}
                        error={errors.type?.message}
                    />
                </FieldGroup>

                <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading}>
                    {loading ? "Salvando..." : "Salvar Categoria"}
                </Button>
            </FieldSet>
        </form>
    );
}
