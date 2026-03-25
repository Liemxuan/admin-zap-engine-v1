import type { Modifier, ModifierListParams, PaginatedResult } from '../types';

const mockModifiers: Modifier[] = [
    { id: '1', name: 'Size', type: 'list', location: 'All branches', details: 'S, M, L', status: 'active', createdAt: '2024-01-01' },
    { id: '2', name: 'Đường', type: 'list', location: 'All branches', details: 'Ít đường, Không đường, Bình thường', status: 'active', createdAt: '2024-01-02' },
    { id: '3', name: 'Nhiệt độ', type: 'list', location: 'All branches', details: 'Nóng, Lạnh, Ít đá', status: 'active', createdAt: '2024-01-03' },
    { id: '4', name: 'Topping', type: 'list', location: 'Chi nhánh Quận 1', details: 'Trân châu, Thạch, Kem', status: 'active', createdAt: '2024-01-04' },
    { id: '5', name: 'Ghi chú bếp', type: 'text', location: 'All branches', details: 'Free text note', status: 'active', createdAt: '2024-01-05' },
    { id: '6', name: 'Yêu cầu đặc biệt', type: 'text', location: 'Chi nhánh Quận 3', details: 'Free text note', status: 'inactive', createdAt: '2024-01-06' },
    { id: '7', name: 'Espresso shots', type: 'list', location: 'Chi nhánh Quận 7', details: 'Single, Double, Triple', status: 'active', createdAt: '2024-01-07' },
    { id: '8', name: 'Loại sữa', type: 'list', location: 'All branches', details: 'Tươi, Đặc, Yến mạch', status: 'active', createdAt: '2024-01-08' },
];

export const modifierService = {
    getModifiers: async (params: ModifierListParams): Promise<PaginatedResult<Modifier>> => {
        await new Promise(resolve => setTimeout(resolve, 400));

        let filtered = [...mockModifiers];

        if (params.search) {
            const q = params.search.toLowerCase();
            filtered = filtered.filter(item =>
                item.id.toLowerCase().includes(q) ||
                item.name.toLowerCase().includes(q) ||
                item.location.toLowerCase().includes(q)
            );
        }

        if (params.status) {
            filtered = filtered.filter(item => item.status === params.status);
        }

        if (params.location) {
            filtered = filtered.filter(item => item.location === params.location);
        }

        if (params.modifierType) {
            filtered = filtered.filter(item => item.type === params.modifierType);
        }

        const pageIndex = params.pageIndex || 1;
        const pageSize = params.pageSize || 10;
        const total = filtered.length;
        const data = filtered.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);

        return { data, total, pageIndex, pageSize };
    },

    getModifierById: async (id: string): Promise<Modifier | null> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockModifiers.find(item => item.id === id) || null;
    },
};
