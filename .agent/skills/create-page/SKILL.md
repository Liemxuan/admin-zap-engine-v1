---
name: create-page
description: Hướng dẫn tạo trang và phát triển tính năng theo kiến trúc Domain-Driven Design (DDD) của ZAP Design Engine.
---

# ZAP Design Engine – Kiến Trúc Hệ Thống & Hướng Dẫn Tạo Trang

Tài liệu này định nghĩa tiêu chuẩn xây dựng ứng dụng ZAP Design Engine, tập trung vào tính mô-đun, dễ mở rộng và tách biệt trách nhiệm (Separation of Concerns).

## 1. Cấu Trúc Thư Mục Chuẩn (Project Structure)

```text
src/
├── app/                # 🧠 TẦNG KHỞI TẠO: Cấu hình toàn hệ thống
│   ├── router/         # Định nghĩa routes (PrivateRoute, PermissionRoute, Lazy loading)
│   ├── providers/      # AuthProvider, ThemeProvider, QueryClientProvider...
│   └── layouts/        # Layout templates (MainLayout, AuthLayout, BlankLayout)
│
├── features/           # 🚀 TẦNG NGHIỆP VỤ: Chia theo tên miền (Domain)
│   ├── auth/           # Đăng nhập, đăng ký, quên mật khẩu
│   ├── dashboard/      # Tổng quan hệ thống
│   ├── product/        # Quản lý sản phẩm
│   ├── order/          # Quản lý đơn hàng
│   ├── customer/       # Quản lý khách hàng
│   ├── inventory/      # Quản lý kho
│   └── report/         # Báo cáo thống kê
│
├── shared/             # 🛠️ TẦNG DÙNG CHUNG: Các tài nguyên tái sử dụng
│   ├── components/     # UI Kits (Button, Input, Modal, Table...)
│   ├── services/       # Base API Client (Axios), Helpers
│   ├── hooks/          # Hooks dùng chung (useDebounce, useLocalStorage...)
│   ├── utils/          # Công cụ xử lý dữ liệu (format date, currency...)
│   ├── constants/      # Enums, config keys, static strings
│   └── types/          # Global interfaces/types
│
├── assets/             # Images, Global Fonts
├── styles/             # Global CSS, Design Tokens
└── App.tsx             # Entry point lắp ráp Providers & Router
```

---

## 2. Chi Tiết Tầng Khởi Tạo (`src/app/`)

Đây là "bộ não" điều khiển cách ứng dụng vận hành. Khi tạo một trang mới, bạn thường xuyên tương tác với tầng này để đăng ký Route và Layout.

### 📂 app/router/
- **PrivateRoute.tsx**: Bảo vệ các trang yêu cầu đăng nhập.
- **PermissionRoute.tsx**: Kiểm tra quyền truy cập (RBAC) trước khi render trang.
- **index.tsx**: Sử dụng `React.lazy` để tối ưu hóa hiệu năng (Code Splitting).

### 📂 app/layouts/
- **MainLayout.tsx**: Chứa Sidebar + Header + Breadcrumb. Dùng cho các trang quản trị.
- **AuthLayout.tsx**: Dùng cho Login/Register (thường có background ảnh và form ở giữa).
- **BlankLayout.tsx**: Trang trắng, dùng cho in ấn hoặc các trang đặc biệt.

---

## 3. Cấu Trúc Một Feature (`src/features/`)

Mỗi Feature là một module độc lập, tuân thủ cấu trúc nội bộ:

```text
src/features/[feature-name]/
 ├── pages/           # LAYOUT: Gọi component & hook để lắp ráp trang hoàn chỉnh.
 ├── components/      # UI & FORM LOGIC: Xử lý tương tác, Validation (LoginForm.tsx).
 ├── hooks/           # FLOW: Quản lý loading/error, gọi services, điều phối dữ liệu.
 ├── services/        # API: Các hàm gọi API cụ thể cho feature này.
 ├── types/           # MODEL: Định nghĩa Request/Response interfaces.
 └── index.ts         # PUBLIC API: Chỉ export những gì bên ngoài cần dùng.
```

---

## 4. Quy Trình Tạo Trang Mới (6 Bước Chuẩn)

### Bước 1: Xác định Feature Domain
Nếu trang thuộc về phân hệ sẵn có (VD: Dashboard), hãy tạo thư mục trong đó. Nếu là phân hệ mới, tạo thư mục feature mới.

### Bước 2: Định nghĩa Model (`types/`)
Xác định cấu trúc dữ liệu trả về từ API.
```typescript
export interface Product { id: string; name: string; price: number; }
```

### Bước 3: Viết API Service (`services/`)
Tạo các hàm fetch/post dữ liệu.
```typescript
export const getProducts = () => axiosClient.get('/products');
```

### Bước 4: Viết Hook Nghiệp Vụ (`hooks/`)
Xử lý logic lấy dữ liệu, phân trang, lọc (Sử dụng `react-query` nếu có).

### Bước 5: Thiết Kế UI & Component (`components/` & `pages/`)
- Tạo các `components` nội bộ để xử lý logic phức tạp.
- Lắp ráp tại `pages`.

### Bước 6: Đăng ký Route (`src/app/router/`)
Thêm trang vào danh sách routes, chọn Layout và phân quyền phù hợp.

---

## 5. Quy Tắc Vàng (Golden Rules)

1. **Don't Repeat Yourself (DRY)**: Nếu một component được dùng ở 2 features khác nhau, hãy chuyển nó vào `shared/components/`.
2. **Lean Pages**: File trong `pages/` không nên chứa logic xử lý dữ liệu phức tạp. Logic đó thuộc về `hooks/`.
3. **Strict Typing**: Không sử dụng `any`. Luôn định nghĩa Interface/Type rõ ràng.
4. **Lazy Loading**: Luôn import các Pages bằng `lazy()` để tăng tốc độ tải trang đầu tiên.
