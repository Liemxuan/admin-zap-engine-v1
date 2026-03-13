export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    status: 'available' | 'out_of_stock';
    createdAt: string;
    updatedAt: string;
}

export interface ProductListParams {
    search?: string;
    pageIndex?: number;
    pageSize?: number;
    category?: string;
    status?: string;
}

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    pageIndex: number;
    pageSize: number;
}
