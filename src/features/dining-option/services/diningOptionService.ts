import type { DiningOption, DiningOptionListParams, PaginatedResult } from '../types';

const mockDiningOptions: DiningOption[] = [
    { id: '1', name: 'Dine-in Table', locationName: 'Main Branch', code: 'TB', type: 'table', isDefault: true, status: 'active', createdAt: '2024-01-01' },
    { id: '2', name: 'Delivery Order', locationName: 'Main Branch', code: 'DG', type: 'delivery', isDefault: false, status: 'active', createdAt: '2024-01-02' },
    { id: '3', name: 'Takeaway Counter', locationName: 'Main Branch', code: 'TC', type: 'table', isDefault: false, status: 'active', createdAt: '2024-01-03' },
    { id: '4', name: 'Delivery Local', locationName: 'Branch 2', code: 'DL', type: 'delivery', isDefault: true, status: 'active', createdAt: '2024-01-04' },
    { id: '5', name: 'Dine-in Table', locationName: 'Branch 2', code: 'TB', type: 'table', isDefault: false, status: 'active', createdAt: '2024-01-05' },
    { id: '6', name: 'Delivery Express', locationName: 'Branch 3', code: 'DG', type: 'delivery', isDefault: true, status: 'active', createdAt: '2024-01-06' },
    { id: '7', name: 'Dine-in Table', locationName: 'Branch 3', code: 'TB', type: 'table', isDefault: false, status: 'inactive', createdAt: '2024-01-07' },
    { id: '8', name: 'Takeaway Counter', locationName: 'Branch 2', code: 'TC', type: 'table', isDefault: false, status: 'active', createdAt: '2024-01-08' },
];

export const diningOptionService = {
    getDiningOptions: async (params: DiningOptionListParams): Promise<PaginatedResult<DiningOption>> => {
        await new Promise(resolve => setTimeout(resolve, 400));

        let filtered = [...mockDiningOptions];

        if (params.search) {
            const q = params.search.toLowerCase();
            filtered = filtered.filter(item =>
                item.id.toLowerCase().includes(q) ||
                item.name.toLowerCase().includes(q) ||
                item.locationName.toLowerCase().includes(q)
            );
        }

        if (params.type) {
            filtered = filtered.filter(item => item.type === params.type);
        }

        if (params.status) {
            filtered = filtered.filter(item => item.status === params.status);
        }

        const pageIndex = params.pageIndex || 1;
        const pageSize = params.pageSize || 10;
        const total = filtered.length;
        const data = filtered.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);

        return { data, total, pageIndex, pageSize };
    },

    getDiningOptionById: async (id: string): Promise<DiningOption | null> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockDiningOptions.find(item => item.id === id) || null;
    },
};
