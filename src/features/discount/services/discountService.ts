import type { Discount, DiscountListParams, PaginatedResult } from '../types';

const mockDiscounts: Discount[] = [
    { id: '1', code: 'WELCOME10', name: 'Chào mừng khách mới', type: 'percent', value: 10, minOrder: 200000, startDate: '2024-01-01', endDate: '2024-12-31', usageCount: 42, usageLimit: 100, status: 'active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: '2', code: 'SAVE50K', name: 'Giảm 50k đơn từ 500k', type: 'fixed', value: 50000, minOrder: 500000, startDate: '2024-02-01', endDate: '2024-06-30', usageCount: 88, usageLimit: 200, status: 'expired', createdAt: '2024-02-01', updatedAt: '2024-02-01' },
    { id: '3', code: 'SUMMER20', name: 'Hè rực rỡ 20%', type: 'percent', value: 20, minOrder: 300000, startDate: '2024-06-01', endDate: '2024-08-31', usageCount: 15, usageLimit: 500, status: 'active', createdAt: '2024-06-01', updatedAt: '2024-06-01' },
    { id: '4', code: 'FLASH100K', name: 'Flash sale giảm 100k', type: 'fixed', value: 100000, minOrder: 1000000, startDate: '2024-03-15', endDate: '2024-03-16', usageCount: 200, usageLimit: 200, status: 'expired', createdAt: '2024-03-15', updatedAt: '2024-03-15' },
    { id: '5', code: 'VIP15', name: 'Khách hàng VIP 15%', type: 'percent', value: 15, minOrder: 0, startDate: '2024-01-01', endDate: '2025-12-31', usageCount: 30, usageLimit: 1000, status: 'active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: '6', code: 'NEWYEAR', name: 'Năm mới giảm 25%', type: 'percent', value: 25, minOrder: 500000, startDate: '2025-01-01', endDate: '2025-01-07', usageCount: 0, usageLimit: 300, status: 'inactive', createdAt: '2024-12-01', updatedAt: '2024-12-01' },
    { id: '7', code: 'FREESHIP', name: 'Miễn phí vận chuyển', type: 'fixed', value: 30000, minOrder: 150000, startDate: '2024-01-01', endDate: '2024-12-31', usageCount: 120, usageLimit: 500, status: 'active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: '8', code: 'BIRTHDAY30', name: 'Sinh nhật giảm 30%', type: 'percent', value: 30, minOrder: 0, startDate: '2024-01-01', endDate: '2025-12-31', usageCount: 5, usageLimit: 50, status: 'active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
];

export const discountService = {
    getDiscounts: async (params: DiscountListParams): Promise<PaginatedResult<Discount>> => {
        await new Promise(resolve => setTimeout(resolve, 400));

        let filtered = [...mockDiscounts];

        if (params.search) {
            const q = params.search.toLowerCase();
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(q) ||
                item.code.toLowerCase().includes(q)
            );
        }

        if (params.status) {
            filtered = filtered.filter(item => item.status === params.status);
        }

        if (params.type) {
            filtered = filtered.filter(item => item.type === params.type);
        }

        const pageIndex = params.pageIndex || 1;
        const pageSize = params.pageSize || 10;
        const total = filtered.length;
        const data = filtered.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);

        return { data, total, pageIndex, pageSize };
    },

    getDiscountById: async (id: string): Promise<Discount | null> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockDiscounts.find(item => item.id === id) || null;
    },
};
