import type { DiningOption, DiningOptionListParams, PaginatedResult } from '../types';

const mockDiningOptions: DiningOption[] = [
    { id: '1', name: 'Pickup', locationName: 'Main Branch', code: 'PU', type: 'delivery', isDefault: false, status: 'active', createdAt: '2024-01-01' },
    { id: '2', name: 'For here', locationName: 'Main Branch', code: 'FH', type: 'table', isDefault: true, status: 'active', createdAt: '2024-01-02' },
    { id: '3', name: 'Delivery', locationName: 'Main Branch', code: 'DE', type: 'delivery', isDefault: false, status: 'active', createdAt: '2024-01-03' },
    { id: '4', name: 'Dine-in', locationName: 'Main Branch', code: 'DI', type: 'table', isDefault: false, status: 'active', createdAt: '2024-01-04' },
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
