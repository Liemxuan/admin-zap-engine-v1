---
name: create-register-page
description: Hướng dẫn chi tiết cách tạo và triển khai trang Đăng ký (Register) cho hệ thống ZAP Design Engine, tuân thủ kiến trúc DDD và các tiêu chuẩn UI/UX của dự án.
---


## 🏗 Cấu trúc Feature (DDD)

Trang Register nằm trong feature `auth`:
- `features/auth/pages/PageRegister.tsx`: Container chính của trang.
- `features/auth/components/RegisterForm.tsx`: Component chứa form và logic validation UI.
- `features/auth/hooks/useRegister.ts`: Hook quản lý logic đăng ký, tự động đăng nhập và điều hướng.
- `features/auth/services/auth.service.ts`: Chứa phương thức call API `Auth/register-merchant`.
- `features/auth/types/auth.types.ts`: Định nghĩa Interface `RegisterRequest` và `RegisterResponse`.

## 🛠 Thông số kỹ thuật

### 1. Data Model (Request)
```typescript
export interface RegisterRequest {
    MerchantName: string; // Tên định danh doanh nghiệp
    Email: string;        // Email liên hệ
    Username: string;     // Tên đăng nhập
    Password: string;     // Mật khẩu
    Provider: string;     // Mặc định là 'Email'
}
```

### 2. Quy tắc Validation (Client-side)
- **Doanh nghiệp (MerchantName)**: Chỉ chấp nhận chữ cái thường (a-z), số (0-9) và dấu gạch ngang (-). Tự động sanitize khi nhập.
- **Email**: Phải đúng định dạng email chuẩn.
- **Username**: Bắt buộc nhập.
- **Password**: Tối thiểu 6 ký tự.
- **Xác nhận mật khẩu**: Phải khớp chính xác với Password.

### 3. Trải nghiệm người dùng (UX)
- **Focus Management**: Khi có lỗi validation, hệ thống phải tự động `focus()` vào ô nhập liệu đầu tiên bị lỗi thông qua `useRef`.
- **Thông báo lỗi**: Hiển thị thông báo lỗi chi tiết bên dưới form (sử dụng các key từ `locales`).
- **Web Components Compatibility**: Sử dụng `useEffect` để lắng nghe sự kiện `input` trực tiếp từ các Custom Elements (`zap-input`) để đảm bảo đồng bộ dữ liệu với React state.

## 🚀 Luồng xử lý thành công (Happy Path)

Sau khi gọi API đăng ký thành công:
1. **Tự động đăng nhập (Auto Login)**: Hệ thống sử dụng `Email` và `Password` vừa đăng ký để gọi tiếp API `login`.
2. **Lưu Token**: Nếu login thành công, lưu `accessToken`, `refreshToken`, `merchantName` vào `localStorage`.
3. **Điều hướng**: Chuyển thẳng người dùng về trang `/${language}/dashboard`.
4. **Fallback**: Nếu tự động đăng nhập thất bại, điều hướng về trang Login đi kèm tham số URL (`?m=...&u=...`) để điền sẵn dữ liệu cho người dùng.

## 🌐 Localization (i18n)

Sử dụng các key trong `src/shared/locales/{lang}/auth.ts`:
- `auth.register.title`: Tiêu đề trang.
- `auth.register.merchantAccount`: Nhãn "Doanh nghiệp".
- `auth.register.error_password_length`: Lỗi độ dài mật khẩu.
- ... và các key validation error tương ứng.

## 📝 Ví dụ triển khai Form

Sử dụng trực tiếp các ZAP Web Components:
```tsx
<zap-input
    ref={merchantRef}
    label={t('auth.register.merchantAccount')}
    value={formData.MerchantName}
    icon-start="building-2"
    fullwidth
></zap-input>
// ... tương tự cho các field khác
```
