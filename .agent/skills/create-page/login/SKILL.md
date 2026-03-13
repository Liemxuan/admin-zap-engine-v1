---
name: create-login-page
description: Hướng dẫn chi tiết cách triển khai và duy trì trang Login theo kiến trúc Domain-Driven Design (DDD) và tích hợp ZAP Web Components.
---

# ZAP Login Page Implementation Skill

Tài liệu này hướng dẫn cách xây dựng trang Login đồng nhất với hệ thống ZAP Design Engine, bao gồm quản lý state, API integration, và giao diện premium.

## 🏗 Cấu trúc Feature (Domain-Driven Design)

Trang Login được đặt tại `src/features/auth/`:
- `pages/PageLogin.tsx`: Layout chính, căn giữa và background.
- `components/LoginForm.tsx`: Form nhập liệu (Account, Email, Password, Remember Me).
- `components/SocialForm.tsx`: Các nút đăng nhập mạng xã hội (Microsoft, Google, Apple).
- `hooks/useLogin.ts`: Logic quản lý state đăng nhập và điều hướng.
- `services/auth.service.ts`: Nơi gọi API thực tế.
- `types/auth.types.ts`: Định dạng dữ liệu (Request/Response) khớp với Backend.

## 🚀 Các tính năng cốt lõi

### 1. Quản lý Form & State
- Sử dụng `useState` để quản lý `formData` (UserName, Password, MerchantName, IsRemember).
- Tích hợp với **ZAP Web Components** (`<zap-input>`, `<zap-button>`, `<zap-checkbox>`).
- **Lưu ý**: Các component Web cần có `setter` cho `name` và `value` để React gán dữ liệu mượt mà.

### 2. Tích hợp API (PascalCase)
Backend trả về dữ liệu theo định dạng **PascalCase**. Cần map đúng các trường:
- `Success`: boolean
- `Message`: string
- `AccessToken`: string
- `RefreshToken`: string

```typescript
// Ví dụ xử lý trong useLogin.ts
if (response.Success) {
    localStorage.setItem('accessToken', response.AccessToken);
    navigate('/dashboard');
}
```

### 3. Hiệu ứng Giao diện (Premium UX)
- **Loading State**: Nút "Sign In" phải hiển thị vòng xoay (spinner) và đổi nhãn thành "Signing In..." khi đang xử lý.
- **Error Handling**: Hiển thị thông báo lỗi bằng tiếng Anh/Việt tương ứng từ API trả về.
- **Submit**: Hỗ trợ cả phím Enter (form submit) và click trực tiếp vào Web Component.

## 🛠 Hướng dẫn Triển khai nhanh

### Bước 1: Khai báo Types
Đảm bảo định dạng PascalCase cho Response:
```typescript
export interface LoginResponse {
    Success: boolean;
    Message: string;
    AccessToken: string;
    // ...
}
```

### Bước 2: Triển khai LoginForm
Sử dụng `zap-button` với trạng thái loading:
```tsx
<zap-button
    label={isLoading ? "Signing In..." : "Sign In"}
    loading={isLoading ? "" : undefined}
    disabled={isLoading}
    onClick={handleSubmit}
></zap-button>
```

### Bước 3: Đăng ký Router
Cấu hình tại `src/app/router.tsx` để `/login` và root `/` đều trỏ về trang đăng nhập.

## ⚠️ Lưu ý quan trọng
- Luôn sử dụng `navigate` từ `react-router-dom` thay vì `window.location.href` để tránh load lại trang.
- Đảm bảo `globals.d.ts` đã khai báo đầy đủ các thẻ `zap-*` để không bị lỗi TypeScript.
- Styles đặc thù cho Login (background, centering) nên đặt trong `PageLogin.tsx` để không ảnh hưởng đến Layout của Dashboard.
