# Forgot Password Feature Development Workflow

---
description: Workflow for implementing the password reset email flow
---

## 1. API Configuration
- Define `Auth/forgot-password` path in constants.
- Set up the API call function in `auth.service.ts`.

## 2. UI Component
- Create `ForgotPasswordForm.tsx` using ZAP components.
- Collect Email value via ref/input event.
- Add Enter keydown event on the input field.

## 3. Page
- Integrate the form into `PageForgotPassword.tsx`.
- Configure `/forgot-password` route in App.tsx.

## 4. Response Handling
- Display a success message or change state after successful submission.
