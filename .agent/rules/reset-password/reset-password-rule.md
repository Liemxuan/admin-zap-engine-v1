# Quy định phát triển tính năng Đặt lại mật khẩu (Reset Password)

## 1. Kiến trúc thư mục (DDD)
- **Components**: `src/features/auth/components/ResetPasswordForm.tsx`
- **Pages**: `src/features/auth/pages/PageResetPassword.tsx`

## 2. Quy tắc giao tiếp API
- Sử dụng `authService.resetPassword`.
- Method: `POST` (Sử dụng `axiosClient.post`).
- Body: `{ ConfirmToken, NewPassword, ConfirmPassword }`.
- Token phải được lấy từ tham số `?token=` trên URL.

## 3. Quy tắc giao diện (UI/UX)
- Ẩn hiện mật khẩu linh hoạt.
- Tự động chuyển hướng về trang Đăng nhập sau khi đặt lại thành công (delay 3s).
- Kiểm tra tính khớp nhau của mật khẩu mới trước khi gọi API.
