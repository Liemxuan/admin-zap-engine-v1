export interface DiningOption {
    id: string;
    name: string;
    locationName: string;
    code: string;
    type: 'table' | 'delivery';
    isDefault: boolean;
    status: 'active' | 'inactive';
    createdAt: string;
}

export interface DiningOptionListParams {
    search?: string;
    pageIndex?: number;
    pageSize?: number;
    type?: 'table' | 'delivery' | '';
    status?: 'active' | 'inactive' | '';
}

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    pageIndex: number;
    pageSize: number;
}
