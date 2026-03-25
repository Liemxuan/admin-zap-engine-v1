import type { Product, ProductListParams, PaginatedResult } from '../types';

// Mock data (5 local products as request)
const mockProducts: Product[] = [
    {
        id: '1',
        name: 'iPhone 15 Pro Max',
        description: 'Màn hình 6.7 inch Super Retina XDR, chip A17 Pro mạnh mẽ.',
        price: 34990000,
        image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&auto=format&fit=crop&q=60',
        category: 'Smartphone',
        status: 'available',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
    },
    {
        id: '2',
        name: 'MacBook Pro M3 Max',
        description: 'Chip M3 Max, 14 inch Liquid Retina XDR, 36GB RAM.',
        price: 79900000,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=60',
        category: 'Laptop',
        status: 'available',
        createdAt: '2024-01-02',
        updatedAt: '2024-01-02'
    },
    {
        id: '3',
        name: 'Sony WH-1000XM5',
        description: 'Tai nghe chống ồn hàng đầu, âm thanh độ phân giải cao.',
        price: 8490000,
        image: 'https://plus.unsplash.com/premium_photo-1678013285721-4647d69b9173?w=800&auto=format&fit=crop&q=60',
        category: 'Headphone',
        status: 'available',
        createdAt: '2024-01-03',
        updatedAt: '2024-01-03'
    },
    {
        id: '4',
        name: 'Apple Watch Ultra 2',
        description: 'Vỏ titan 49mm bền bỉ, GPS tần số kép chính xác.',
        price: 21990000,
        image: 'https://images.unsplash.com/photo-1544117518-30dd5fc7a9ca?w=800&auto=format&fit=crop&q=60',
        category: 'Smartwatch',
        status: 'available',
        createdAt: '2024-01-04',
        updatedAt: '2024-01-04'
    },
    {
        id: '5',
        name: 'Logitech MX Master 3S',
        description: 'Chuột không dây công thái học tốt nhất cho công việc.',
        price: 2490000,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=60',
        category: 'Accessory',
        status: 'available',
        createdAt: '2024-01-05',
        updatedAt: '2024-01-05'
    },
    {
        id: '6',
        name: 'iPad Pro M2 12.9"',
        description: 'Màn hình Liquid Retina XDR, hiệu năng vượt trội.',
        price: 31990000,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=60',
        category: 'Tablet',
        status: 'available',
        createdAt: '2024-01-06',
        updatedAt: '2024-01-06'
    },
    {
        id: '7',
        name: 'Keychron Q3 Pro',
        description: 'Bàn phím cơ Custom full nhôm, núm xoay đa năng.',
        price: 4500000,
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=60',
        category: 'Accessory',
        status: 'available',
        createdAt: '2024-01-07',
        updatedAt: '2024-01-07'
    },
    {
        id: '8',
        name: 'Samsung Galaxy S24 Ultra',
        description: 'Bút S Pen huyền thoại, zoom 100x cực đỉnh.',
        price: 29990000,
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=60',
        category: 'Smartphone',
        status: 'available',
        createdAt: '2024-01-08',
        updatedAt: '2024-01-08'
    },
    {
        id: '9',
        name: 'Dell XPS 15 9530',
        description: 'Laptop Windows tốt nhất cho người sáng tạo.',
        price: 48000000,
        image: 'https://images.unsplash.com/photo-1593642532400-2682810df593?w=800&auto=format&fit=crop&q=60',
        category: 'Laptop',
        status: 'available',
        createdAt: '2024-01-09',
        updatedAt: '2024-01-09'
    },
    {
        id: '10',
        name: 'ASUS ROG Swift PG279QM',
        description: 'Màn hình gaming 240Hz, độ trễ cực thấp.',
        price: 18500000,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=60',
        category: 'Monitor',
        status: 'available',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-10'
    },
    { id: '11', name: 'AirPods Pro 2', description: 'Chống ồn chủ động gấp 2 lần.', price: 5990000, image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=200', category: 'Headphone', status: 'available', createdAt: '2024-01-11', updatedAt: '2024-01-11' },
    { id: '12', name: 'Kindle Paperwhite 5', description: 'Màn hình 6.8 inch, đọc sách mọi lúc.', price: 3800000, image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=200', category: 'Tablet', status: 'available', createdAt: '2024-01-12', updatedAt: '2024-01-12' },
    { id: '13', name: 'Razer DeathAdder V3 Pro', description: 'Chuột siêu nhẹ cho game thủ chuyên nghiệp.', price: 3500000, image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=200', category: 'Accessory', status: 'available', createdAt: '2024-01-13', updatedAt: '2024-01-13' },
    { id: '14', name: 'Fujifilm X-T5', description: 'Máy ảnh Mirrorless phong cách cổ điển.', price: 42000000, image: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=200', category: 'Camera', status: 'available', createdAt: '2024-01-14', updatedAt: '2024-01-14' },
    { id: '15', name: 'GoPro Hero 12', description: 'Camera hành trình đỉnh cao cho phượt thủ.', price: 10500000, image: 'https://images.unsplash.com/photo-1500643190977-1d5427181f72?w=200', category: 'Camera', status: 'available', createdAt: '2024-01-15', updatedAt: '2024-01-15' },
    { id: '16', name: 'DJI Mini 4 Pro', description: 'Flycam nhỏ gọn, quay video 4K HDR.', price: 21000000, image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=200', category: 'Drone', status: 'available', createdAt: '2024-01-16', updatedAt: '2024-01-16' },
    { id: '17', name: 'SteelSeries Apex Pro TKL', description: 'Bàn phím cơ nhanh nhất thế giới.', price: 5200000, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=200', category: 'Accessory', status: 'available', createdAt: '2024-01-17', updatedAt: '2024-01-17' },
    { id: '18', name: 'PS5 Slim Edition', description: 'Trải nghiệm đỉnh cao thế giới game.', price: 13500000, image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=200', category: 'Gaming', status: 'available', createdAt: '2024-01-18', updatedAt: '2024-01-18' },
    { id: '19', name: 'Apple MagSafe Battery Pack', description: 'Sạc dự phòng hít nam châm tiện lợi.', price: 2200000, image: 'https://images.unsplash.com/photo-1625514523024-500b411516e1?w=200', category: 'Accessory', status: 'available', createdAt: '2024-01-19', updatedAt: '2024-01-19' },
    { id: '20', name: 'Microsoft Surface Pro 9', description: 'Sức mạnh laptop, tính linh hoạt tablet.', price: 28000000, image: 'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=200', category: 'Laptop', status: 'available', createdAt: '2024-01-20', updatedAt: '2024-01-20' },
    { id: '21', name: 'Nintendo Switch OLED', description: 'Chơi game tay cầm hoặc cắm TV.', price: 8500000, image: 'https://images.unsplash.com/photo-1578303372704-14a269aca3a5?w=200', category: 'Gaming', status: 'available', createdAt: '2024-01-21', updatedAt: '2024-01-21' },
    { id: '22', name: 'Corsair Dominator Platinum 32GB', description: 'RAM DDR5 hiệu năng cao với LED RGB.', price: 4200000, image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200', category: 'PC Component', status: 'available', createdAt: '2024-01-22', updatedAt: '2024-01-22' },
    { id: '23', name: 'Samsung 990 Pro 1TB', description: 'Ổ cứng SSD NVMe tốc độ đọc 7,450 MB/s.', price: 3500000, image: 'https://images.unsplash.com/photo-1597872200370-496de239a563?w=200', category: 'PC Component', status: 'available', createdAt: '2024-01-23', updatedAt: '2024-01-23' },
    { id: '24', name: 'Herman Miller Aeron', description: 'Ghế công thái học tốt nhất thế giới.', price: 45000000, image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=200', category: 'Furniture', status: 'available', createdAt: '2024-01-24', updatedAt: '2024-01-24' },
    { id: '25', name: 'Lego Star Wars Millennium Falcon', description: 'Mô hình Lego khổng lồ cực chi tiết.', price: 22000000, image: 'https://images.unsplash.com/photo-1585366119957-e773d40f4e15?w=200', category: 'Toy', status: 'available', createdAt: '2024-01-25', updatedAt: '2024-01-25' },
    { id: '26', name: 'Broken Image Example', description: 'This item has a broken image link to test fallback.', price: 0, image: '/invalid-path.jpg', category: 'Testing', status: 'out_of_stock', createdAt: '2024-01-26', updatedAt: '2024-01-26' },
];

export const productService = {
    getProducts: async (params: ProductListParams): Promise<PaginatedResult<Product>> => {
        // Mocking API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        let filtered = [...mockProducts];

        // Search logic
        if (params.search) {
            const searchLower = params.search.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(searchLower) || 
                p.description.toLowerCase().includes(searchLower)
            );
        }

        // Category filter
        if (params.categories && params.categories.length > 0) {
            filtered = filtered.filter(p => params.categories!.includes(p.category));
        }

        // Status filter
        if (params.status) {
            filtered = filtered.filter(p => p.status === params.status);
        }

        // Pagination logic
        const pageIndex = params.pageIndex || 1;
        const pageSize = params.pageSize || 10;
        const total = filtered.length;
        const startIndex = (pageIndex - 1) * pageSize;
        const data = filtered.slice(startIndex, startIndex + pageSize);

        return {
            data,
            total,
            pageIndex,
            pageSize
        };
    },

    getProductById: async (id: string): Promise<Product | null> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockProducts.find(p => p.id === id) || null;
    }
};
