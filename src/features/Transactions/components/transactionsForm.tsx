import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, TextAreaFormField } from "@/components/FieldForms";
import { SelectFormField } from "@/components/FieldForms/selectFormField";
import { Button } from "@/components/ui/Button";
import { FieldGroup } from "@/components/ui/Field";
import { FieldSet } from "@/components/ui/Field/fieldSet";
import { Spinner } from "@/components/ui/Spinner";
import { useGetAllAccounts } from "@/features/Account/hooks/useGetAllAccounts";
import { useGetAllCategories } from "@/features/Categories/hooks/useGetAllCategories";
import { TRANSACTION_TYPE_OPTIONS } from "@/shared/constants/transactionTypeOptions.const";
import { transactionFormSchema } from "@/shared/schemas/transactionsSchema";
import type { IFormBaseProps } from "@/shared/types/formBase.types";
import type { TransactionFormValues } from "@/shared/types/transactions.types";

export function TransactionsForm({
  onSubmit,
  loading,
}: Readonly<IFormBaseProps<TransactionFormValues>>) {

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

  const { data: accounts, isLoading: accountsLoading } = useGetAllAccounts();

  const { data: categories, isLoading: categoriesLoading } = useGetAllCategories();

  const accountOptions = accounts?.map(account => ({
    label: account.name,
    value: account.id,
  })) ?? [];

  const categoryOptions = categories?.map(category => ({
    label: category.name,
    value: category.id,
  })) ?? [];

  const transactionTypeOptions = TRANSACTION_TYPE_OPTIONS.map(option => ({
    label: option.label,
    value: option.value,
  }));
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet className="space-y-4">
            <FieldGroup>
                {accountsLoading ? (
                  <Spinner className="mx-auto my-4 w-4 h-4" />
                ) : 
                  <SelectFormField<TransactionFormValues>
                      id="accountType"
                      label="Conta"
                      placeholder="Selecione a conta"
                      fieldName="accountId"
                      control={control}
                      options={accountOptions}
                      error={errors.accountId?.message}
                  />
                }

                {categoriesLoading ? (
                  <Spinner className="mx-auto my-4 w-4 h-4" />
                ) :
                  <SelectFormField<TransactionFormValues>
                      id="categoryType"
                      label="Categoria"
                      placeholder="Selecione a categoria"
                      fieldName="categoryId"
                      control={control}
                      options={categoryOptions}
                      error={errors.categoryId?.message}
                  />
                }

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
                      options={transactionTypeOptions}
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