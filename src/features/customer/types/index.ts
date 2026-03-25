export interface Customer {
    id: string;
    name: string;
    group: string;
    membership: string;
    email: string;
    phone: string;
    wallet: number;
    point: number;
    status: 'active' | 'inactive';
    createdAt: string;
}

export interface CustomerListParams {
    search?: string;
    pageIndex?: number;
    pageSize?: number;
    status?: string;
    membership?: string;
    dateFrom?: string;
    dateTo?: string;
}

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    pageIndex: number;
    pageSize: number;
}
