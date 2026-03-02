import { useForm } from "react-hook-form";
import type { IAccountFormProps, AccountFormValues } from "@/shared/types/account.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/shared/schemas/accountSchema";
import { FieldGroup, FieldSet } from "@/components/ui/Field";
import { ACCOUNT_TYPE_OPTIONS } from "@/shared/constants/accountTypeOptions.const";
import { Button } from "@/components/ui/Button/button";
import { FormField } from "@/components/FieldForms/formField";
import { SelectFormField } from "@/components/FieldForms/selectFormField";

export function AccountForm({ 
  onSubmit, 
  loading 
}: Readonly<IAccountFormProps>) {
  const {
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
                    <FormField
                        id="name"
                        label="Nome"
                        type="text"
                        placeholder="Digite o nome da conta"
                        error={errors.name?.message}
                        control={control}
                        fieldName="name"
                    />

                    <FormField
                        id="balance"
                        label="Saldo"
                        type="number"
                        placeholder="Digite o saldo da conta"
                        error={errors.balance?.message}
                        control={control}
                        fieldName="balance"
                    />

                    <SelectFormField<AccountFormValues>
                        id="type"
                        label="Tipo de Conta"
                        placeholder="Selecione o tipo"
                        fieldName="type"
                        control={control}
                        options={ACCOUNT_TYPE_OPTIONS ?? []}
                        error={errors.type?.message}
                    />
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
