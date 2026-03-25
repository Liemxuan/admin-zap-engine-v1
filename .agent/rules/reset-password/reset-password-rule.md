# Reset Password Feature Development Rules

## 1. Folder Architecture (DDD)
- **Components**: `src/features/auth/components/ResetPasswordForm.tsx`
- **Pages**: `src/features/auth/pages/PageResetPassword.tsx`

## 2. API Communication Rules
- Use `authService.resetPassword`.
- Method: `POST` (use `axiosClient.post`).
- Body: `{ ConfirmToken, NewPassword, ConfirmPassword }`.
- Token must be extracted from the `?token=` URL parameter.

## 3. UI/UX Rules
- Toggle password visibility flexibly.
- Auto-redirect to the Login page after successful reset (3s delay).
- Validate that the new passwords match before calling the API.
