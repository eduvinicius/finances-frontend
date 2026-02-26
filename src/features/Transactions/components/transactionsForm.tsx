import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, TextAreaFormField } from "@/components/FieldForms";
import { SelectFormField } from "@/components/FieldForms/selectFormField";
import { Button } from "@/components/ui/Button";
import { FieldGroup } from "@/components/ui/Field";
import { FieldSet } from "@/components/ui/Field/fieldSet";
import { transactionFormSchema } from "@/shared/schemas/transactionsSchema";
import type { IFormBaseProps } from "@/shared/types/formBase.types";
import type { ITransactionComboboxProps, TransactionFormValues } from "@/shared/types/transactions.types";

export function TransactionsForm({
  onSubmit,
  loading,
  selectOptions,
}: Readonly<IFormBaseProps<TransactionFormValues, ITransactionComboboxProps>>) {

  const {
      handleSubmit,
      control,
      formState: { errors },
  } = useForm<TransactionFormValues>({
      resolver: zodResolver(transactionFormSchema),
      mode: "onTouched",
      defaultValues: {
        accountId: "",
        categoryId: "",
        amount: 0,
        type: 0,
        description: "",
      },
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet className="space-y-4">
            <FieldGroup>
                <SelectFormField<TransactionFormValues>
                    id="accountType"
                    label="Conta"
                    placeholder="Selecione a conta"
                    fieldName="accountId"
                    control={control}
                    options={selectOptions?.accountsOptions ?? []}
                    error={errors.accountId?.message}
                />

                <SelectFormField<TransactionFormValues>
                    id="categoryType"
                    label="Categoria"
                    placeholder="Selecione a categoria"
                    fieldName="categoryId"
                    control={control}
                    options={selectOptions?.categoriesOptions ?? []}
                    error={errors.categoryId?.message}
                />
                  
                <FormField
                    id="amount"
                    label="Valor"
                    type="number"
                    placeholder="Digite o valor da transação"
                    error={errors.amount?.message}
                    control={control}
                    fieldName="amount"
                />

                <TextAreaFormField<TransactionFormValues>
                    id="description"
                    label="Descrição"
                    placeholder="Digite uma descrição para a transação"
                    fieldName="description"
                    control={control}
                    error={errors.description?.message}
                />

                <SelectFormField<TransactionFormValues>
                      id="type"
                      label="Tipo de Transação"
                      placeholder="Selecione o tipo"
                      fieldName="type"
                      control={control}
                      options={selectOptions?.transactionTypeOptions ?? []}
                      error={errors.type?.message}
                  />
            </FieldGroup>

            <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}>
                {loading ? "Salvando..." : "Salvar Transação"}
            </Button>
        </FieldSet>
    </form>
  );
}