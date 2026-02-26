export interface IFiltersBaseProps<T, K = unknown> {
    onFilter: (data: T) => void;
    onClear?: () => void;
    loading?: boolean;
    selectOptions?: K;
}