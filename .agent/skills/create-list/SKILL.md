---
name: create-list
description: Hướng dẫn tạo trang Danh sách (List View) chuẩn ZAP Design, bao gồm Phân trang, Tìm kiếm và hiển thị dữ liệu theo kiến trúc DDD.
---

# ZAP Design Engine – Hướng Dẫn Tạo Trang Danh Sách (List View)

Tài liệu này hướng dẫn quy trình tiêu chuẩn để tạo một trang quản lý danh sách dữ liệu (ví dụ: Danh sách sản phẩm, khách hàng, đơn hàng) dựa trên mẫu (pattern) của tính năng **Product**.

## 1. Thành Phần Của Một Trang Danh Sách

Mẫu chuẩn ZAP Design cho trang danh sách bao gồm 5 thành phần chính:

### 📂 1.1 Model (`types/index.ts`)
Định nghĩa Interface cho đối tượng và các tham số truy vấn (Query Params).
```typescript
// Interface của đối tượng
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    status: 'available' | 'out_of_stock';
    image: string;
}

// Interface cho tham số lọc/phân trang
export interface ProductParams {
    pageIndex?: number;
    pageSize?: number;
    search?: string;
    category?: string;
}
```

### 📂 1.2 Service (`services/index.ts`)
Các hàm gọi API sử dụng `axiosClient`.
```typescript
export const getProducts = async (params: ProductParams) => {
    // Giả lập hoặc gọi API thật
    const response = await axiosClient.get('/api/products', { params });
    return response.data; // Thường trả về { items: [], total: 0 }
};
```

### 📂 1.3 Hook Nghiệp Vụ (`hooks/useProducts.ts`)
Sử dụng `useState` và `useEffect` để quản lý logic tìm kiếm, phân trang và trạng thái tải.
```typescript
export const useProducts = (initialParams: ProductParams) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [params, setParams] = useState(initialParams);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getProducts(params);
            setProducts(res.items);
            setTotal(res.total);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, [params]);

    const handleSearch = (search: string) => {
        setParams(prev => ({ ...prev, search, pageIndex: 1 }));
    };

    const handlePageChange = (pageIndex: number) => {
        setParams(prev => ({ ...prev, pageIndex }));
    };

    return { products, total, loading, params, handleSearch, handlePageChange };
};
```

### 📂 1.4 UI Component (`components/ProductList.tsx`)
Hiển thị Thanh tìm kiếm (Search Bar), Bảng dữ liệu (Table) và Phân trang (Pagination).
- **Search Bar**: Ô nhập liệu `zap-input` với icon `search` và bộ lọc.
- **Table**: Bảng chuẩn với tiêu đề viết hoa, bo góc 2xl và bóng đổ mịn.
- **Badge**: Hiển thị trạng thái bằng `zap-badge`.
- **Pagination**: Các nút `zap-button` điều hướng trang ở dưới cùng.

### 📂 1.5 Trang Hoàn Chỉnh (`pages/PageProduct.tsx`)
Bọc Component danh sách trong `MainLayout` và thêm tiêu đề trang cùng nút "Thêm mới".

---

## 2. Quy Tắc Thiết Kế UI Chuẩn ZAP

1.  **Skeleton Loading**: Luôn hiển thị trạng thái mờ (skeleton) khi đang tải dữ liệu để tránh giật lag UI.
2.  **Empty State**: Nếu không có dữ liệu, hiển thị hình minh họa và thông điệp hướng dẫn rõ ràng.
3.  **Responsive Table**: Sử dụng `overflow-x-auto` để đảm bảo bảng hoạt động tốt trên di động.
4.  **Premium Hover**: Các hàng trong bảng phải có hiệu ứng `hover:bg-slate-50/50` và chuyển đổi mượt mà.
5.  **Search Input**: Phải có icon kính lúp và hỗ trợ tìm kiếm ngay khi nhập (hoặc debounce).

---

## 3. Danh Sách Kiểm Tra (Checklist)

- [ ] Đã định nghĩa đầy đủ Type cho Entity và Query Params chưa?
- [ ] Hook đã xử lý reset `pageIndex` về 1 khi tìm kiếm chưa?
- [ ] Đã hiển thị tổng số kết quả (Showing X of Y) chưa?
- [ ] Các Badge trạng thái đã có icon (dot) và màu sắc phù hợp chưa?
- [ ] Phân trang đã có các nút First/Last/Prev/Next chưa?
