import type { Customer, CustomerListParams, PaginatedResult } from '../types';

const mockCustomers: Customer[] = [
    { id: '1', name: 'Nguyễn Văn An', group: 'VIP', membership: 'Gold', email: 'an.nguyen@email.com', phone: '0901234567', wallet: 4500000, point: 9800, status: 'active', createdAt: '2024-01-01' },
    { id: '2', name: 'Trần Thị Bích', group: 'Regular', membership: 'Silver', email: 'bich.tran@email.com', phone: '0912345678', wallet: 1200000, point: 3400, status: 'active', createdAt: '2024-01-02' },
    { id: '3', name: 'Lê Hoàng Cường', group: 'VIP', membership: 'Gold', email: 'cuong.le@email.com', phone: '0923456789', wallet: 3800000, point: 8200, status: 'active', createdAt: '2024-01-03' },
    { id: '4', name: 'Phạm Thị Dung', group: 'New', membership: 'None', email: 'dung.pham@email.com', phone: '0934567890', wallet: 0, point: 120, status: 'active', createdAt: '2024-02-01' },
    { id: '5', name: 'Hoàng Minh Đức', group: 'Regular', membership: 'Bronze', email: 'duc.hoang@email.com', phone: '0945678901', wallet: 650000, point: 1500, status: 'active', createdAt: '2024-01-15' },
    { id: '6', name: 'Ngô Thị Hoa', group: 'VIP', membership: 'Gold', email: 'hoa.ngo@email.com', phone: '0956789012', wallet: 5000000, point: 10000, status: 'active', createdAt: '2023-12-01' },
    { id: '7', name: 'Vũ Quốc Hùng', group: 'Regular', membership: 'Silver', email: 'hung.vu@email.com', phone: '0967890123', wallet: 980000, point: 2700, status: 'inactive', createdAt: '2024-01-20' },
    { id: '8', name: 'Đặng Thị Lan', group: 'New', membership: 'None', email: 'lan.dang@email.com', phone: '0978901234', wallet: 200000, point: 350, status: 'active', createdAt: '2024-03-01' },
    { id: '9', name: 'Bùi Văn Mạnh', group: 'Regular', membership: 'Bronze', email: 'manh.bui@email.com', phone: '0989012345', wallet: 450000, point: 1100, status: 'active', createdAt: '2024-02-10' },
    { id: '10', name: 'Đinh Thị Ngọc', group: 'New', membership: 'None', email: 'ngoc.dinh@email.com', phone: '0990123456', wallet: 0, point: 50, status: 'inactive', createdAt: '2024-03-15' },
];

export const customerService = {
    getCustomers: async (params: CustomerListParams): Promise<PaginatedResult<Customer>> => {
        await new Promise(resolve => setTimeout(resolve, 400));

        let filtered = [...mockCustomers];

        if (params.search) {
            const q = params.search.toLowerCase();
            filtered = filtered.filter(item =>
                item.id.toLowerCase().includes(q) ||
                item.name.toLowerCase().includes(q) ||
                item.email.toLowerCase().includes(q) ||
                item.phone.includes(q)
            );
        }

        if (params.status) {
            filtered = filtered.filter(item => item.status === params.status);
        }

        if (params.membership) {
            filtered = filtered.filter(item => item.membership === params.membership);
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

    getCustomerById: async (id: string): Promise<Customer | null> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCustomers.find(item => item.id === id) || null;
    },
};
