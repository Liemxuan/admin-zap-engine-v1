export interface Group {
    id: string;
    name: string;
    itemCount: number;
    status: 'active' | 'inactive';
    createdAt: string;
}

export interface GroupListParams {
    search?: string;
    pageIndex?: number;
    pageSize?: number;
    status?: string;
}

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    pageIndex: number;
    pageSize: number;
}
