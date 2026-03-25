export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    productCount: number;
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
}

export interface CategoryListParams {
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
