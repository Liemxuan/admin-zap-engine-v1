export type DiscountType = 'percent' | 'fixed';
export type DiscountStatus = 'active' | 'inactive' | 'expired';

export interface Discount {
    id: string;
    code: string;
    name: string;
    type: DiscountType;
    value: number;
    minOrder: number;
    startDate: string;
    endDate: string;
    usageCount: number;
    usageLimit: number;
    status: DiscountStatus;
    createdAt: string;
    updatedAt: string;
}

export interface DiscountListParams {
    search?: string;
    pageIndex?: number;
    pageSize?: number;
    status?: string;
    type?: string;
}

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    pageIndex: number;
    pageSize: number;
}
