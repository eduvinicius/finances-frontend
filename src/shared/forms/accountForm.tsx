import { Controller, useForm } from "react-hook-form";
import type { IAccountFormProps, AccountFormValues } from "../types/account.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "../schemas/accountSchema";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/InputSelect/";
import { ACCOUNT_TYPE_OPTIONS } from "../constants/accountTypeOptions.const";
import { Button } from "@/components/ui/Button/button";

export function AccountForm({ 
    onSubmit, 
    loading 
}: Readonly<IAccountFormProps>) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<AccountFormValues>({
        resolver: zodResolver(accountSchema),
        mode: "onTouched",
        defaultValues: {
            name: "",
            balance: 0,
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
                            placeholder="Digite o nome da conta"
                            aria-invalid={!!errors.name}
                            {...register("name")}
                        />
                        <FieldDescription
                            className={errors.name ? "text-red-500" : ""}>
                            {errors.name ? errors.name.message : ""}
                        </FieldDescription>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="balance">Quantidade</FieldLabel>
                        <Input
                            id="balance"
                            type="number"
                            placeholder="Digite o saldo da conta"
                            aria-invalid={!!errors.balance}
                            {...register("balance", { valueAsNumber: true })}
                        />
                        <FieldDescription
                            className={errors.balance ? "text-red-500" : ""}>
                            {errors.balance ? errors.balance.message : ""}
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
                                        {ACCOUNT_TYPE_OPTIONS.map((option) => (
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
                    {loading ? "Salvando..." : "Salvar Conta"}
                </Button>
            </FieldSet>
        </form>
    );
}