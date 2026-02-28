export interface ISelectBaseProps<T> {
    label: string;
    value: T
}

export interface ISelectOptionsFromHooks<T, K> {
    categoriesOptions: ISelectBaseProps<T>[];
    accountsOptions: ISelectBaseProps<T>[];
    transactionTypeOptions: ISelectBaseProps<K>[];
}

export interface ISelectBaseFromHooksProps<T, K> {
    selectOptions: ISelectOptionsFromHooks<T, K>;
    isLoading: boolean;
}