---
name: create-register-page
description: Detailed guide for creating and implementing the Register page for ZAP Design Engine, following DDD architecture and project UI/UX standards.
---

## Feature Structure (DDD)

The Register page is in the auth feature:
- features/auth/pages/PageRegister.tsx: Main page container.
- features/auth/components/RegisterForm.tsx: Component containing the form and UI validation logic.
- features/auth/hooks/useRegister.ts: Hook managing registration logic, auto-login, and navigation.
- features/auth/services/auth.service.ts: Contains the Auth/register-merchant API call method.
- features/auth/types/auth.types.ts: Defines RegisterRequest and RegisterResponse interfaces.

## Technical Specifications

### 1. Data Model (Request)
RegisterRequest interface fields:
- MerchantName: string - Business identifier name
- Email: string - Contact email
- Username: string - Login username
- Password: string - Password
- Provider: string - Default is Email

### 2. Validation Rules (Client-side)
- **Business (MerchantName)**: Only accepts lowercase letters (a-z), digits (0-9), and hyphens (-). Auto-sanitize on input.
- **Email**: Must be a valid email format.
- **Username**: Required.
- **Password**: Minimum 6 characters.
- **Confirm password**: Must exactly match Password.

### 3. User Experience (UX)
- **Focus Management**: On validation error, the system must automatically focus() on the first failing input via useRef.
- **Error Messages**: Display detailed error messages below the form (using keys from locales).
- **Web Components Compatibility**: Use useEffect to listen to input events directly from Custom Elements (zap-input) to ensure data sync with React state.

## Success Flow (Happy Path)

After a successful registration API call:
1. **Auto Login**: The system uses the registered Email and Password to call the login API.
2. **Save Token**: If login succeeds, save accessToken, refreshToken, merchantName to localStorage.
3. **Navigate**: Redirect the user directly to //dashboard.
4. **Fallback**: If auto-login fails, redirect to the Login page with URL parameters (?m=...&u=...) to pre-fill the user data.

## Localization (i18n)

Use keys from src/shared/locales/{lang}/auth.ts:
- auth.register.title: Page title.
- auth.register.merchantAccount: Label for Business.
- auth.register.error_password_length: Password length error.
- ... and corresponding validation error keys.

## Form Implementation Example

Use ZAP Web Components directly. For each field, use zap-input with ref, label (via t()), value, icon-start, and fullwidth attributes.
