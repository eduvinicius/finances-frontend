export interface IFormBaseProps<T> {
    onSubmit: (data: T) => void;
    loading?: boolean;
}