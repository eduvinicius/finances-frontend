import { Button } from "@/components/ui/Button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/InputGroup/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/InputSelect";
import { categorySchema } from "@/shared/schemas/categorySchema";
import type { CategoryFormProps, CategoryFormValues } from "@/shared/types/categoryForm.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { transactionTypeOptions } from "../constants/transactionTypeOptions.const";

export function CategoryForm({ 
    onSubmit, 
    loading 
}: Readonly<CategoryFormProps>) {
    const {
        register,
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
                    <Field>
                        <FieldLabel htmlFor="name">Nome</FieldLabel>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Digite o nome da categoria"
                            aria-invalid={!!errors.name}
                            {...register("name")}
                        />
                        <FieldDescription
                            className={errors.name ? "text-red-500" : ""}>
                            {errors.name ? errors.name.message : ""}
                        </FieldDescription>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="description">Descrição</FieldLabel>
                        <Textarea
                            id="description"
                            placeholder="Digite a descrição da categoria"
                            aria-invalid={!!errors.description}
                            {...register("description")}
                        />
                        <FieldDescription
                            className={errors.description ? "text-red-500" : ""}>
                            {errors.description ? errors.description.message : ""}
                        </FieldDescription>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="type">Tipo de Transação</FieldLabel>
                        <Controller
                            name="type"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={field.value?.toString() ?? ""}
                                    onValueChange={(value) => field.onChange(Number(value))}
                                >
                                    <SelectTrigger
                                        id="type"
                                        className="w-full"
                                        aria-invalid={!!errors.type}
                                    >
                                        <SelectValue placeholder="Selecione o tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {transactionTypeOptions.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value.toString()}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <FieldDescription
                            className={errors.type ? "text-red-500" : ""}>
                            {errors.type ? errors.type.message : ""}
                        </FieldDescription>
                    </Field>
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
