# Danh sách công việc trang Login (ZAP Design Engine)

Danh sách checklist bắt buộc khi xây dựng hoặc nâng cấp trang Login.

---

### 📋 Checklist Triển khai:
- [ ] **[LGN-TSK-01]** Khai báo Types: Định nghĩa PascalCase Interfaces cho request/response.
- [ ] **[LGN-TSK-02]** Đa ngôn ngữ (i18n): Cập nhật localization Tiếng Việt/Anh trong `src/shared/locales/`.
- [ ] **[LGN-TSK-03]** Tích hợp API: Triển khai các hàm gọi tới `/api/login/`.
- [ ] **[LGN-TSK-04]** Xây dựng Logical Hook: Hoàn thiện `useLogin` cho UI navigation.
- [ ] **[LGN-TSK-05]** LoginForm: Sử dụng `zap-input`, `zap-button` và `zap-checkbox`.
- [ ] **[LGN-TSK-06]** SocialForm: Cài đặt các nút mạng xã hội (Google, Apple, Microsoft).
- [ ] **[LGN-TSK-07]** Page UI: Xây dựng `PageLogin.tsx` với layout căn tâm và background video/parallax.
- [ ] **[LGN-TSK-08]** Router Setup: Đăng ký Router (`React.lazy`).
- [ ] **[LGN-TSK-09]** Auth Flow: Lưu token vào `localStorage` và redirects.

### ⚡ Kiểm tra hiệu ứng (UX/UI Checklist):
- [ ] **[LGN-TSK-10]** Hiệu ứng Signing In... trên nút Login khi gọi API.
- [ ] **[LGN-TSK-11]** Hiển thị Error Alert chi tiết (thông báo bằng tiếng Việt/Anh).
- [ ] **[LGN-TSK-12]** Mobile Responsive: Kiểm tra layout trên mọi kích thước màn hình.
- [ ] **[LGN-TSK-13]** Remember Me: Lưu thông tin đăng nhập đúng kỳ vọng.
- [ ] **[LGN-TSK-14]** Hỗ trợ phím Enter cho tất cả input fields.

### 🛠 Bảo trì & Nâng cấp (Advanced):
- [ ] **[LGN-TSK-15]** Viết unit tests cho `auth.service.ts` và `useLogin.ts`.
- [ ] **[LGN-TSK-16]** Tối ưu hóa tải tài nguyên ảnh/video trên Login.
- [ ] **[LGN-TSK-17]** Thêm Forgot Password flow (nếu yêu cầu).
