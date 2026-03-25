# Register Feature Development Rules

This document defines the rules and standards when developing or modifying the Register feature in ZAP Design Engine.

## 1. Folder Architecture (DDD)
All Register-related code must reside in the `features/auth` module:
- **Components**: `src/features/auth/components/RegisterForm.tsx`
- **Pages**: `src/features/auth/pages/PageRegister.tsx`
- **Services**: `src/features/auth/services/auth.service.ts`
- **Types**: `src/features/auth/types/auth.types.ts`
- **Locales**: `src/shared/locales/{lang}/auth.ts`

## 2. API Communication Rules
- Use `authService.register` to call the API.
- The endpoint must be defined in `src/shared/constants/storage.ts`.
- Default HTTP method: `POST`.
- Request body must conform to the `RegisterRequest` interface.

## 3. UI/UX Rules
- Use ZAP system Web Components: `<zap-input>`, `<zap-button>`, `<zap-checkbox>`.
- Must support multi-language (i18n) via `useLanguage`.
- Display clear error messages when the API returns an error or validation fails.

## 4. Event Handling & Form
- Must listen to `input` events from custom elements to update state.
- Must support form submission via the **Enter** key.
- After successful registration, auto-redirect to the Login page with the necessary parameters (e.g. `m` for MerchantName).
