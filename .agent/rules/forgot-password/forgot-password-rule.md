# Quy định phát triển tính năng Quên mật khẩu (Forgot Password)

Tài liệu này định nghĩa các quy tắc và tiêu chuẩn khi phát triển hoặc chỉnh sửa tính năng Quên mật khẩu.

## 1. Kiến trúc thư mục (DDD)
- **Components**: `src/features/auth/components/ForgotPasswordForm.tsx`
- **Pages**: `src/features/auth/pages/PageForgotPassword.tsx`
- **Services**: `src/features/auth/services/auth.service.ts`
- **Locales**: `src/shared/locales/{lang}/auth.ts`

## 2. Quy tắc giao tiếp API
- Sử dụng `authService.forgotPassword` để gửi yêu cầu reset.
- Endpoint: `Auth/forgot-password`.
- Method: `POST`.
- Body: `{ Email: string }`.

## 3. Quy tắc giao diện (UI/UX)
- Sử dụng `<zap-input>` cho trường Email.
- Hiển thị thông báo hướng dẫn người dùng check email sau khi gửi thành công.
- Nút "Quay lại đăng nhập" phải luôn hiện hữu.
