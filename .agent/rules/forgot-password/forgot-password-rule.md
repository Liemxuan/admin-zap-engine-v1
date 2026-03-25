# Forgot Password Feature Development Rules

This document defines the rules and standards when developing or modifying the Forgot Password feature.

## 1. Folder Architecture (DDD)
- **Components**: `src/features/auth/components/ForgotPasswordForm.tsx`
- **Pages**: `src/features/auth/pages/PageForgotPassword.tsx`
- **Services**: `src/features/auth/services/auth.service.ts`
- **Locales**: `src/shared/locales/{lang}/auth.ts`

## 2. API Communication Rules
- Use `authService.forgotPassword` to send the reset request.
- Endpoint: `Auth/forgot-password`.
- Method: `POST`.
- Body: `{ Email: string }`.

## 3. UI/UX Rules
- Use `<zap-input>` for the Email field.
- Display a guidance message instructing the user to check their email after successful submission.
- The "Back to login" button must always be visible.
