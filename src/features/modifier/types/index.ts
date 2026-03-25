export interface Modifier {
    id: string;
    name: string;
    type: 'list' | 'text';
    location: string;
    details: string;
    status: 'active' | 'inactive';
    createdAt: string;
}

export interface ModifierListParams {
    search?: string;
    pageIndex?: number;
    pageSize?: number;
    status?: string;
    location?: string;
    modifierType?: string;
}

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    pageIndex: number;
    pageSize: number;
}
