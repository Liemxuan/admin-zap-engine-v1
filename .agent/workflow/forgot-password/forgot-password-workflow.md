# Quy trình phát triển tính năng Quên mật khẩu

---
description: Quy trình triển khai luồng gửi email reset mật khẩu
---

## 1. API Cấu hình
- Định nghĩa đường dẫn `Auth/forgot-password` trong constants.
- Thiết lập hàm gọi API trong `auth.service.ts`.

## 2. UI Component
- Tạo `ForgotPasswordForm.tsx` sử dụng ZAP components.
- Thu thập giá trị Email qua ref/input event.
- Thêm sự kiện Keydown Enter cho ô input.

## 3. Page
- Tích hợp form vào `PageForgotPassword.tsx`.
- Cấu hình route /forgot-password trong App.tsx.

## 4. Xử lý Tràn bộ (Response)
- Hiển thị thông báo hoặc chuyển trạng thái sau khi submit thành công.
