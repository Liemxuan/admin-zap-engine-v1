# Login Page Rules (ZAP Design Engine)

This document defines mandatory technical standards when working with the Login page (src/features/auth/).

### 1. Architecture & Location (DDD Implementation)
- **Feature Layer**: All login logic must reside entirely within src/features/auth/.
- **Separation of Concerns**:
  - pages/: Layout structure and component assembly only.
  - components/: UI logic & form handlers.
  - hooks/: Business logic, state management (e.g. useLogin).
  - services/: API layer (Axios clients).
  - types/: Domain models (request/response definitions).

### 2. Data Normalization (Backend Consistency)
- **PascalCase Enforcement**: All interfaces reflecting data returned from the ZAP Design Engine PHP Backend API must use PascalCase.
  - Example: Success, Message, AccessToken, RefreshToken.
- **Type Safety**: Never use any. Always define complete interfaces for all payloads.

### 3. UI Components (Design System)
- **Web Component First**: Only use <zap-input>, <zap-button>, and <zap-checkbox>.
- **State Handling**: These components must bind value and onChange (or custom event) with React state consistently.
- **Button Loading**: All API request actions must reflect a loading state on zap-button.

### 4. Navigation & Security
- **React-Router Only**: Use useNavigate for successful redirects.
- **Local Storage**: Tokens after successful login must be stored in localStorage using the agreed key format.

---
> [!NOTE]
> To maintain a consistent UI, login-specific styles should be scoped inside the CSS of src/features/auth/.
