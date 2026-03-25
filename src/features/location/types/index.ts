export interface Location {
    id: string;
    name: string;
    code: string;
    address: string;
    phone: string;
    manager: string;
    status: 'active' | 'inactive';
    createdAt: string;
}

export interface LocationListParams {
    search?: string;
    pageIndex?: number;
    pageSize?: number;
    status?: string;
    manager?: string;
    dateFrom?: string;
    dateTo?: string;
}

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    pageIndex: number;
    pageSize: number;
}
