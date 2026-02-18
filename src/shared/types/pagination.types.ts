export interface IPaginatedBaseResponse<T> {
    items: T;
    totalCount: number;
}

export interface IPaginatedRequest {
    page: number;
    pageSize: number;
}