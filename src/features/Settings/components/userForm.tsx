import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/shared/schemas/userSchema";
import { FieldSet } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button/button";
import type { IFormBaseProps } from "@/shared/types/formBase.types";
import type { UserFormValues } from "@/shared/types/user.types";
import { CPFField, FormField, PhoneField } from "@/components/FieldForms";
import { BirthDateField } from "@/components/FieldForms/birthDateField";

export function UserForm({ 
    onSubmit, 
    loading = false,
    initialValues
}: Readonly<IFormBaseProps<UserFormValues>>) {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        mode: "onTouched",
        defaultValues: initialValues || {
            fullName: "",
            nickname: "",
            email: "",
            documentNumber: "",
            phoneNumber: "",
            address: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
        },
    });

    useEffect(() => {
        if (initialValues) {
            reset(initialValues);
        }
    }, [initialValues, reset]);

    return (
        <form 
            className="p-5"
            onSubmit={handleSubmit(onSubmit)}>
            <FieldSet className="space-y-6 grid grid-cols-4 w-full">
                <FormField
                    id="fullName"
                    label="Nome Completo"
                    type="text"
                    placeholder="Digite seu nome completo"
                    error={errors.fullName?.message}
                    control={control}
                    fieldName="fullName"
                />
                <FormField
                    id="nickname"
                    label="Apelido"
                    type="text"
                    placeholder="Digite seu apelido"
                    error={errors.nickname?.message}
                    control={control}
                    fieldName="nickname"
                />
                <BirthDateField 
                    control={control} 
                    error={errors.birthDate?.message} 
                />
                <FormField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="seu@email.com"
                    error={errors.email?.message}
                    control={control}
                    fieldName="email"
                />
                <PhoneField 
                    control={control} 
                    error={errors.phoneNumber?.message} 
                />

                <CPFField 
                    control={control} 
                    error={errors.documentNumber?.message} 
                />

                <FormField
                    id="address"
                    label="Logradouro (Opcional)"
                    type="text"
                    placeholder="Rua, número, complemento"
                    error={errors.address?.message}
                    control={control}
                    fieldName="address"
                />

                <FormField
                    id="city"
                    label="Cidade (Opcional)"
                    type="text"
                    placeholder="Cidade"
                    error={errors.city?.message}
                    control={control}
                    fieldName="city"
                />
                <FormField
                    id="state"
                    label="Estado (Opcional)"
                    type="text"
                    placeholder="UF"
                    error={errors.state?.message}
                    control={control}
                    fieldName="state"
                />

                <FormField
                    id="postalCode"
                    label="CEP (Opcional)"
                    type="text"
                    placeholder="00000-000"
                    error={errors.postalCode?.message}
                    control={control}
                    fieldName="postalCode"
                />
                <FormField
                    id="country"
                    label="País (Opcional)"
                    type="text"
                    placeholder="Brasil"
                    error={errors.country?.message}
                    control={control}
                    fieldName="country"
                />
            </FieldSet>
            <div className="flex items-center justify-end w-full">
                <Button 
                    type="submit" 
                    className="" 
                    disabled={loading}>
                    {loading ? "Editando..." : "Editar Usuário"}
                </Button>
            </div>
        </form>
    );
}
