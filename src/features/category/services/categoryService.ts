import type { Category, CategoryListParams, PaginatedResult } from '../types';

const generateMockCategories = (count: number): Category[] => {
    const baseCategories: Category[] = [
        { id: '1', name: 'Smartphone', slug: 'smartphone', description: 'Điện thoại thông minh các loại', productCount: 5, status: 'active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
        { id: '2', name: 'Laptop', slug: 'laptop', description: 'Máy tính xách tay', productCount: 3, status: 'active', createdAt: '2024-01-02', updatedAt: '2024-01-02' },
        { id: '3', name: 'Headphone', slug: 'headphone', description: 'Tai nghe các loại', productCount: 4, status: 'active', createdAt: '2024-01-03', updatedAt: '2024-01-03' },
        { id: '4', name: 'Smartwatch', slug: 'smartwatch', description: 'Đồng hồ thông minh', productCount: 2, status: 'active', createdAt: '2024-01-04', updatedAt: '2024-01-04' },
        { id: '5', name: 'Tablet', slug: 'tablet', description: 'Máy tính bảng', productCount: 3, status: 'active', createdAt: '2024-01-05', updatedAt: '2024-01-05' },
        { id: '6', name: 'Accessory', slug: 'accessory', description: 'Phụ kiện công nghệ', productCount: 8, status: 'active', createdAt: '2024-01-06', updatedAt: '2024-01-06' },
        { id: '7', name: 'Camera', slug: 'camera', description: 'Máy ảnh và thiết bị quay phim', productCount: 4, status: 'active', createdAt: '2024-01-07', updatedAt: '2024-01-07' },
        { id: '8', name: 'Gaming', slug: 'gaming', description: 'Thiết bị và phụ kiện game', productCount: 6, status: 'active', createdAt: '2024-01-08', updatedAt: '2024-01-08' },
        { id: '9', name: 'Monitor', slug: 'monitor', description: 'Màn hình máy tính', productCount: 2, status: 'active', createdAt: '2024-01-09', updatedAt: '2024-01-09' },
        { id: '10', name: 'PC Component', slug: 'pc-component', description: 'Linh kiện máy tính', productCount: 5, status: 'inactive', createdAt: '2024-01-10', updatedAt: '2024-01-10' },
    ];

    const result = [...baseCategories];
    for (let i = 11; i <= count; i++) {
        result.push({
            id: i.toString(),
            name: `Category ${i}`,
            slug: `category-${i}`,
            description: `Mô tả cho category ${i}`,
            productCount: Math.floor(Math.random() * 20),
            status: Math.random() > 0.1 ? 'active' : 'inactive',
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01'
        });
    }
    return result;
};

const mockCategories = generateMockCategories(1000);

export const categoryService = {
    getCategories: async (params: CategoryListParams): Promise<PaginatedResult<Category>> => {
        await new Promise(resolve => setTimeout(resolve, 400));

        let filtered = [...mockCategories];

        if (params.search) {
            const q = params.search.toLowerCase();
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(q) ||
                item.slug.toLowerCase().includes(q)
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

    getCategoryById: async (id: string): Promise<Category | null> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCategories.find(item => item.id === id) || null;
    },
};
