import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { userSchema } from "@/shared/schemas/userSchema";
import { Field, FieldDescription, FieldLabel, FieldSet } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button/button";
import { Calendar } from "@/components/ui/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { cn } from "@/lib/utils";
import type { DateFieldProps, FormFieldProps, IFormBaseProps } from "@/shared/types/formBase.types";
import type { UserFormValues } from "@/shared/types/user.types";

function FormField({ 
    id, 
    label, 
    type, 
    placeholder, 
    error, 
    helperText, 
    register, 
    fieldName 
}: Readonly<FormFieldProps<UserFormValues>>) {
    return (
        <Field>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <Input
                id={id}
                type={type}
                placeholder={placeholder}
                aria-invalid={!!error}
                {...register(fieldName)}
            />
            <FieldDescription className={error ? "text-red-500" : ""}>
                {error || helperText || ""}
            </FieldDescription>
        </Field>
    );
}

function BirthDateField({ control, error }: Readonly<DateFieldProps<UserFormValues>>) {
    const currentYear = new Date().getFullYear();
    const startDate = new Date(1900, 0, 1);
    const endDate = new Date(currentYear, 11, 31);

    return (
        <Field>
            <FieldLabel htmlFor="birthDate">Data de Nascimento</FieldLabel>
            <Controller
                name="birthDate"
                control={control}
                render={({ field }) => (
                    <Popover>
                        <PopoverTrigger className="text-white" asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-left font-normal bg-transparent hover:bg-transparent",
                                    !field.value && "text-muted-foreground"
                                )}
                                type="button"
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                    format(field.value, "PPP", { locale: ptBR })
                                ) : (
                                    <span>Selecione a data</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                captionLayout="dropdown-years"
                                startMonth={startDate}
                                endMonth={endDate}
                            />
                        </PopoverContent>
                    </Popover>
                )}
            />
            <FieldDescription className={error ? "text-red-500" : ""}>
                {error || ""}
            </FieldDescription>
        </Field>
    );
}

export function UserForm({ 
    onSubmit, 
    loading = false
}: Readonly<IFormBaseProps<UserFormValues>>) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        mode: "onTouched",
        defaultValues: {
            fullName: "",
            nickName: "",
            profileImageUrl: "",
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
                    register={register}
                    fieldName="fullName"
                />
                <FormField
                    id="nickName"
                    label="Apelido"
                    type="text"
                    placeholder="Digite seu apelido"
                    error={errors.nickName?.message}
                    register={register}
                    fieldName="nickName"
                />
                <BirthDateField 
                    control={control} 
                    error={errors.birthDate?.message} 
                />
                <FormField
                    id="profileImageUrl"
                    label="URL da Foto de Perfil (Opcional)"
                    type="url"
                    placeholder="https://exemplo.com/foto.jpg"
                    error={errors.profileImageUrl?.message}
                    register={register}
                    fieldName="profileImageUrl"
                />

                <FormField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="seu@email.com"
                    error={errors.email?.message}
                    register={register}
                    fieldName="email"
                />
                <FormField
                    id="phoneNumber"
                    label="Telefone (Opcional)"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    error={errors.phoneNumber?.message}
                    register={register}
                    fieldName="phoneNumber"
                />

                <FormField
                    id="documentNumber"
                    label="Número do Documento (Opcional)"
                    type="text"
                    placeholder="000.000.000-00"
                    error={errors.documentNumber?.message}
                    register={register}
                    fieldName="documentNumber"
                />

                <FormField
                    id="address"
                    label="Logradouro (Opcional)"
                    type="text"
                    placeholder="Rua, número, complemento"
                    error={errors.address?.message}
                    register={register}
                    fieldName="address"
                />

                <FormField
                    id="city"
                    label="Cidade (Opcional)"
                    type="text"
                    placeholder="Cidade"
                    error={errors.city?.message}
                    register={register}
                    fieldName="city"
                />
                <FormField
                    id="state"
                    label="Estado (Opcional)"
                    type="text"
                    placeholder="UF"
                    error={errors.state?.message}
                    register={register}
                    fieldName="state"
                />

                <FormField
                    id="postalCode"
                    label="CEP (Opcional)"
                    type="text"
                    placeholder="00000-000"
                    error={errors.postalCode?.message}
                    register={register}
                    fieldName="postalCode"
                />
                <FormField
                    id="country"
                    label="País (Opcional)"
                    type="text"
                    placeholder="Brasil"
                    error={errors.country?.message}
                    register={register}
                    fieldName="country"
                />
            </FieldSet>
            <div className="flex items-center justify-end w-full">
                <Button 
                    type="submit" 
                    className="" 
                    disabled={loading}>
                    {loading ? "Salvando..." : "Salvar Usuário"}
                </Button>
            </div>
        </form>
    );
}
