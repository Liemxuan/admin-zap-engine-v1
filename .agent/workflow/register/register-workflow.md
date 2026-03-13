# Quy trình phát triển tính năng Đăng ký

Tài liệu này định nghĩa quy chuẩn để phát triển hoặc nâng cấp tính năng Đăng ký theo mô hình ZAP Design Engine.

---
description: Quy trình phát triển tính năng Đăng ký tài khoản doanh nghiệp (Merchant)
---

## 1. Cấu hình & Types
Đảm bảo các kiểu dữ liệu và đường dẫn API đã được định nghĩa đầy đủ.
- [x] Định nghĩa `RegisterRequest` trong `src/features/auth/types/auth.types.ts`.
- [x] Cấu hình endpoint trong `src/shared/constants/storage.ts`.

## 2. API Service
Tạo hàm xử lý gọi API trong `authService`.
- [x] Tạo hàm `register` thực hiện gọi `axiosClient.post`.

## 3. UI Component (Form)
Xây dựng form nhập liệu chính.
- [x] Tạo `src/features/auth/components/RegisterForm.tsx`.
- [x] Sử dụng các thẻ custom web components: `<zap-input>`, `<zap-button>`.
- [x] Lắng nghe sự kiện `input` bằng `addEventListener` và thuộc tính `ref`.
- [x] Xử lý phím **Enter** trên các input để gửi form.

## 4. Trang hiển thị (Page)
Kết hợp form vào trang hoàn chỉnh.
- [x] Tạo `src/features/auth/pages/PageRegister.tsx`.
- [x] Tích hợp layout mặc định cho Auth (Hero image bên trái, Form bên phải).
- [x] Đăng ký Route trong `src/App.tsx`.

## 5. Locales
Đảm bảo mọi văn bản (label, placeholder, error) đều sử dụng i18n.
- [x] Thêm các key tương ứng vào `src/shared/locales/{lang}/auth.ts`.
- [x] Sử dụng hook `useLanguage` và hàm `t` để hiển thị trên UI.
