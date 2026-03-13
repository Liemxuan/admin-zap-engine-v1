# Danh sách nhiệm vụ tính năng Đăng ký

Tài liệu này theo dõi các đầu việc cần thực hiện cho tính năng Đăng ký tài khoản doanh nghiệp.

## 1. Nền tảng & Cấu trúc
- [x] Định nghĩa các kiểu dữ liệu `RegisterRequest` và `RegisterResponse`.
- [x] Cấu hình endpoint `Auth/register-merchant` trong constants.
- [x] Khởi tạo `authService.register`.

## 2. Phát triển UI
- [x] Xây dựng `RegisterForm` sử dụng ZAP Web Components.
- [x] Xây dựng `PageRegister` tích hợp layout Hero.
- [x] Cấu hình Routing cho trang đăng ký.

## 3. Logic & Xử lý
- [x] Validate dữ liệu đầu vào (Email, Mật khẩu, Re-password).
- [x] Xử lý sự kiện `input` và `submit`.
- [x] Tích hợp xử lý phím **Enter**.
- [ ] Xử lý thông báo thành công và chuyển hướng thông minh.

## 4. Đa ngôn ngữ & Tối ưu
- [x] Cập nhật locales tiếng Việt cho các nhãn (label) và thông báo lỗi.
- [ ] Cập nhật locales tiếng Anh.
- [ ] Tối ưu hóa hiệu ứng chuyển cảnh (Animations).
