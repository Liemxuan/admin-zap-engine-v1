# Register Feature Development Workflow

This document defines the standard for developing or upgrading the Register feature in ZAP Design Engine.

---
description: Workflow for developing merchant account registration
---

## 1. Configuration & Types
Ensure data types and API endpoints are fully defined.
- [x] Define `RegisterRequest` in `src/features/auth/types/auth.types.ts`.
- [x] Configure endpoint in `src/shared/constants/storage.ts`.

## 2. API Service
Create the API call handler in `authService`.
- [x] Create `register` function calling `axiosClient.post`.

## 3. UI Component (Form)
Build the main input form.
- [x] Create `src/features/auth/components/RegisterForm.tsx`.
- [x] Use custom web component tags: `<zap-input>`, `<zap-button>`.
- [x] Listen to `input` events via `addEventListener` and `ref`.
- [x] Handle **Enter** key on inputs to submit the form.

## 4. Page (Display)
Combine the form into a complete page.
- [x] Create `src/features/auth/pages/PageRegister.tsx`.
- [x] Integrate default Auth layout (Hero image on left, Form on right).
- [x] Register Route in `src/App.tsx`.

## 5. Locales
Ensure all text (labels, placeholders, errors) uses i18n.
- [x] Add corresponding keys to `src/shared/locales/{lang}/auth.ts`.
- [x] Use `useLanguage` hook and `t` function to display on UI.
