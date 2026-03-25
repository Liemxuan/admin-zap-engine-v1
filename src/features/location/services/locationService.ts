import type { Location, LocationListParams, PaginatedResult } from '../types';

const mockLocations: Location[] = [
    { id: '1', name: 'Chi nhánh Quận 1', code: 'Q1-HCM', address: '123 Nguyễn Huệ, P. Bến Nghé', phone: '0901234567', manager: 'Nguyễn Văn An', status: 'active', createdAt: '2024-01-01' },
    { id: '2', name: 'Chi nhánh Quận 3', code: 'Q3-HCM', address: '45 Võ Văn Tần, P. Võ Thị Sáu', phone: '0901234568', manager: 'Trần Thị Bình', status: 'active', createdAt: '2024-01-02' },
    { id: '3', name: 'Chi nhánh Quận 7', code: 'Q7-HCM', address: '89 Nguyễn Thị Thập, P. Tân Phú', phone: '0901234569', manager: 'Lê Văn Cường', status: 'active', createdAt: '2024-01-03' },
    { id: '4', name: 'Chi nhánh Bình Thạnh', code: 'BT-HCM', address: '12 Đinh Bộ Lĩnh, P.24', phone: '0901234570', manager: 'Phạm Thị Dung', status: 'active', createdAt: '2024-01-04' },
    { id: '5', name: 'Chi nhánh Tân Bình', code: 'TB-HCM', address: '78 Cộng Hòa, P.4', phone: '0901234571', manager: 'Hoàng Văn Em', status: 'inactive', createdAt: '2024-01-05' },
    { id: '6', name: 'Chi nhánh Hoàn Kiếm', code: 'HK-HN', address: '56 Hàng Bài, P. Tràng Tiền', phone: '0901234572', manager: 'Vũ Thị Giang', status: 'active', createdAt: '2024-01-06' },
    { id: '7', name: 'Chi nhánh Đống Đa', code: 'DD-HN', address: '34 Chùa Láng, P. Láng Thượng', phone: '0901234573', manager: 'Đỗ Văn Hùng', status: 'active', createdAt: '2024-01-07' },
    { id: '8', name: 'Chi nhánh Hải Châu', code: 'HC-DN', address: '99 Trần Phú, P. Hải Châu 1', phone: '0901234574', manager: 'Ngô Thị Lan', status: 'active', createdAt: '2024-01-08' },
];

export const locationService = {
    getLocations: async (params: LocationListParams): Promise<PaginatedResult<Location>> => {
        await new Promise(resolve => setTimeout(resolve, 400));

        let filtered = [...mockLocations];

        if (params.search) {
            const q = params.search.toLowerCase();
            filtered = filtered.filter(item =>
                item.id.toLowerCase().includes(q) ||
                item.name.toLowerCase().includes(q) ||
                item.code.toLowerCase().includes(q) ||
                item.address.toLowerCase().includes(q) ||
                item.manager.toLowerCase().includes(q)
            );
        }

        if (params.status) {
            filtered = filtered.filter(item => item.status === params.status);
        }

        if (params.manager) {
            const q = params.manager.toLowerCase();
            filtered = filtered.filter(item => item.manager.toLowerCase().includes(q));
        }

        if (params.dateFrom) {
            filtered = filtered.filter(item => item.createdAt >= params.dateFrom!);
        }

        if (params.dateTo) {
            filtered = filtered.filter(item => item.createdAt <= params.dateTo!);
        }

        const pageIndex = params.pageIndex || 1;
        const pageSize = params.pageSize || 10;
        const total = filtered.length;
        const data = filtered.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);

        return { data, total, pageIndex, pageSize };
    },

    getAllLocations: async (): Promise<Location[]> => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return [...mockLocations];
    },

    getLocationById: async (id: string): Promise<Location | null> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockLocations.find(item => item.id === id) || null;
    },
};
