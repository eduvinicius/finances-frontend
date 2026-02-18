export interface IFiltersBaseProps<T> {
    onFilter: (data: T) => void;
    onClear?: () => void;
    loading?: boolean;
}