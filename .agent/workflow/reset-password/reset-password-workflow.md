# Quy trình phát triển tính năng Đặt lại mật khẩu

---
description: Quy trình hoàn thiện luồng Reset Password từ link email
---

## 1. Extract Token
- Sử dụng `URLSearchParams` để lấy token từ `location.search`.

## 2. API Submission
- Gửi yêu cầu với body gồm token và mật khẩu mới.
- Đảm bảo dùng đúng phương thức `POST`.

## 3. Feedback Loop
- Hiển thị thông báo thành công.
- Tự động chuyển hướng người dùng về trang đăng nhập để họ tiếp tục sử dụng hệ thống.
