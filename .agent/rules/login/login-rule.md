# Quy tắc chuyên biệt cho trang Login (ZAP Design Engine)

Tài liệu này định nghĩa các quy chuẩn kỹ thuật bắt buộc khi làm việc với trang Login (`src/features/auth/`).

### 1. Kiến trúc & Vị trí (DDD Implementation)
- **Feature Layer**: Toàn bộ logic login phải nằm hoàn toàn trong `src/features/auth/`.
- **Phân tách trách nhiệm**:
  - `pages/`: Chỉ chứa cấu trúc layout và lắp ráp các thành phần.
  - `components/`: UI logic & form handlers.
  - `hooks/`: Business logic, state management (như `useLogin`).
  - `services/`: API layer (Axios clients).
  - `types/`: Domain models (định nghĩa request/response).

### 2. Chuẩn hóa Dữ liệu (Backend Consistency)
- **PascalCase Enforcement**: Mọi Interface phản ánh dữ liệu trả về từ API của ZAP Design Engine PHP Backend phải sử dụng PascalCase.
  - Ví dụ: `Success`, `Message`, `AccessToken`, `RefreshToken`.
- **Type Safety**: Tuyệt đối không sử dụng `any`. Phải định nghĩa interface đầy đủ cho mọi payload.

### 3. Thành phần giao diện (Design System)
- **Web Component First**: Chỉ sử dụng `<zap-input>`, `<zap-button>`, và `<zap-checkbox>`.
- **State Handling**: Các component này phải được binding `value` và `onChange` (hoặc custom event) với React state một cách đồng nhất.
- **Button Loading**: Mọi thao tác gửi request đều phải thể hiện trạng thái `loading` trên `zap-button`.

### 4. Điều hướng & Bảo mật
- **React-Router Only**: Sử dụng `useNavigate` cho các chuyển hướng thành công.
- **Local Storage**: Token sau khi login thành công phải được lưu trữ vào `localStorage` theo đúng định dạng key đã thống nhất.

---
> [!NOTE]
> Để giữ giao diện thống nhất, các styles đặc thù cho login nên được scoping bên trong CSS của `src/features/auth/`.
