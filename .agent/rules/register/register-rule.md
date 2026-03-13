# Quy định phát triển tính năng Đăng ký (Register)

Tài liệu này định nghĩa các quy tắc và tiêu chuẩn khi phát triển hoặc chỉnh sửa tính năng Đăng ký trong hệ thống ZAP Design Engine.

## 1. Kiến trúc thư mục (DDD)
Mọi code liên quan đến Đăng ký phải nằm trong module `features/auth`:
- **Components**: `src/features/auth/components/RegisterForm.tsx`
- **Pages**: `src/features/auth/pages/PageRegister.tsx`
- **Services**: `src/features/auth/services/auth.service.ts`
- **Types**: `src/features/auth/types/auth.types.ts`
- **Locales**: `src/shared/locales/{lang}/auth.ts`

## 2. Quy tắc giao tiếp API
- Sử dụng `authService.register` để gọi API.
- Endpoint phải được định nghĩa trong `src/shared/constants/storage.ts`.
- Mặc định sử dụng phương thức `POST`.
- Body request phải tuân thủ interface `RegisterRequest`.

## 3. Quy tắc giao diện (UI/UX)
- Sử dụng các Web Components của hệ thống ZAP: `<zap-input>`, `<zap-button>`, `<zap-checkbox>`.
- Phải hỗ trợ đa ngôn ngữ (i18n) thông qua `useLanguage`.
- Hiển thị thông báo lỗi rõ ràng khi API trả về lỗi hoặc validate không pass.

## 4. Xử lý sự kiện và Form
- Phải lắng nghe sự kiện `input` từ các custom elements để cập nhật state.
- Phải hỗ trợ gửi form bằng phím **Enter**.
- Sau khi đăng ký thành công, tự động chuyển hướng về trang Đăng nhập kèm theo các tham số cần thiết (ví dụ: `m` cho MerchantName).
