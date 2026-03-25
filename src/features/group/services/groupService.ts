import type { Group, GroupListParams, PaginatedResult } from '../types';

const mockGroups: Group[] = [
    { id: '1', name: 'Đồ uống', itemCount: 24, status: 'active', createdAt: '2024-01-01' },
    { id: '2', name: 'Cà phê', itemCount: 12, status: 'active', createdAt: '2024-01-02' },
    { id: '3', name: 'Trà', itemCount: 8, status: 'active', createdAt: '2024-01-03' },
    { id: '4', name: 'Bánh ngọt', itemCount: 15, status: 'active', createdAt: '2024-01-04' },
    { id: '5', name: 'Thức ăn nhanh', itemCount: 20, status: 'active', createdAt: '2024-01-05' },
    { id: '6', name: 'Combo', itemCount: 6, status: 'active', createdAt: '2024-01-06' },
    { id: '7', name: 'Theo mùa', itemCount: 4, status: 'inactive', createdAt: '2024-01-07' },
    { id: '8', name: 'Đặc biệt', itemCount: 9, status: 'active', createdAt: '2024-01-08' },
];

export const groupService = {
    getGroups: async (params: GroupListParams): Promise<PaginatedResult<Group>> => {
        await new Promise(resolve => setTimeout(resolve, 400));

        let filtered = [...mockGroups];

        if (params.search) {
            const q = params.search.toLowerCase();
            filtered = filtered.filter(item =>
                item.id.toLowerCase().includes(q) ||
                item.name.toLowerCase().includes(q)
            );
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

    getGroupById: async (id: string): Promise<Group | null> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockGroups.find(item => item.id === id) || null;
    },
};
