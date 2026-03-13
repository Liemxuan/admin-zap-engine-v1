# Quy trình triển khai trang Login (ZAP Design Engine)

Quy trình chuẩn hóa phục vụ cho việc phát hành hoặc bảo trì trang Login.

---

### [LGN-WF-01] Khai báo Domain Types (`src/features/auth/types/`)
- Định nghĩa interfaces cho Login Request (UserName/Account, Email/MerchantName, Password, IsRemember).
- Định nghĩa interfaces cho Login Response (Success, Message, AccessToken, RefreshToken - áp dụng PascalCase).

### [LGN-WF-02] Phát triển Auth Service (API) (`src/features/auth/services/`)
- Viết các hàm gọi API thông qua Axions Client dùng chung. 
- Mapping và ép kiểu dữ liệu nghiêm ngặt cho API payload và responses.

### [LGN-WF-03] Triển khai Business Logic Hook (`src/features/auth/hooks/`)
- Quản lý `formData` thông qua `useState`.
- Xử lý logic Loading state, Error message từ API trả về.
- Xử lý lưu Token vào `localStorage` và redirects về Dashboard khi thành công.

### [LGN-WF-04] Xây dựng UI Components (`src/features/auth/components/`)
- Sử dụng `<zap-input>` cho fields, `<zap-button>` cho Submit.
- Tạo `LoginForm.tsx` (Logic form) và `SocialForm.tsx` (Social logins).
- Tích hợp i18n (`useTranslation`) cho label, placeholder và thông báo lỗi.

### [LGN-WF-05] Hoàn thiện Page Layout (`src/features/auth/pages/`)
- Tạo `PageLogin.tsx`: Thiết kế layout căn giữa, background responsive cho mọi thiết bị.
- Áp dụng animation mượt mà khi load form vào trang.

### [LGN-WF-06] Đăng ký Route & Code-splitting (`src/app/router/`)
- Thêm Route vào trang cấu hình ứng dụng.
- Sử dụng `React.lazy` để tối ưu tải trang đầu tiên.
- Đảm bảo path `/login` và root `/` trỏ về đúng `PageLogin`.

---

### Mẹo tối ưu:
- **[LGN-WF-TIP-01]** Luôn kiểm tra trạng thái `disabled` của button khi `isLoading` để tránh double request.
- **[LGN-WF-TIP-02]** Hỗ trợ tương tác phím Enter (`keyDown`) trên toàn bộ form login để tăng tốc độ người dùng.
