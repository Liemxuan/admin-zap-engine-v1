# Register Feature Task List

This document tracks the tasks required for the merchant account registration feature.

## 1. Foundation & Structure
- [x] Define `RegisterRequest` and `RegisterResponse` types.
- [x] Configure `Auth/register-merchant` endpoint in constants.
- [x] Initialize `authService.register`.

## 2. UI Development
- [x] Build `RegisterForm` using ZAP Web Components.
- [x] Build `PageRegister` with Hero layout integration.
- [x] Configure routing for the register page.

## 3. Logic & Handling
- [x] Validate input data (Email, Password, Re-password).
- [x] Handle `input` and `submit` events.
- [x] Integrate **Enter** key handling.
- [ ] Handle success notification and smart redirect.

## 4. Localization & Optimization
- [x] Update Vietnamese locales for labels and error messages.
- [ ] Update English locales.
- [ ] Optimize transition animations.
