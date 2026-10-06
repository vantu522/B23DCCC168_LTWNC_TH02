

export interface ApiResponse<T> {
    success: boolean,
    message: string,
    data: T,
    // pagination?: Paginated<T>
}

export interface Paginated<T> {
    item: T[];
    pageSize: number;
    limit: number;
    page: number
}