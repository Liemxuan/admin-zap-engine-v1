---
name: create-login-page
description: Detailed guide for implementing and maintaining the Login page following Domain-Driven Design (DDD) architecture with ZAP Web Components integration.
---

# ZAP Login Page Implementation Skill

This document guides you on building the Login page consistent with the ZAP Design Engine system, including state management, API integration, and premium UI.

## Feature Structure (Domain-Driven Design)

The Login page is located at src/features/auth/:
- pages/PageLogin.tsx: Main layout, centering and background.
- components/LoginForm.tsx: Input form (Account, Email, Password, Remember Me).
- components/SocialForm.tsx: Social login buttons (Microsoft, Google, Apple).
- hooks/useLogin.ts: Login state management logic and navigation.
- services/auth.service.ts: Actual API calls.
- types/auth.types.ts: Data formats (Request/Response) matching the Backend.

## Core Features

### 1. Form & State Management
- Use useState to manage formData (UserName, Password, MerchantName, IsRemember).
- Integrate with ZAP Web Components (zap-input, zap-button, zap-checkbox).
- Note: Web components need setter for name and value so React can assign data smoothly.

### 2. API Integration (PascalCase)
Backend returns data in PascalCase format. Map fields correctly:
- Success: boolean
- Message: string
- AccessToken: string
- RefreshToken: string

After a successful login, call localStorage.setItem(accessToken, response.AccessToken) then navigate to /dashboard.

### 3. UI Effects (Premium UX)
- **Loading State**: The Sign In button must show a spinner and change label to Signing In... while processing.
- **Error Handling**: Display error messages in English/Vietnamese from the API response.
- **Submit**: Support both Enter key (form submit) and direct click on Web Component.

## Quick Implementation Guide

### Step 1: Declare Types
Ensure PascalCase format for LoginResponse: Success (boolean), Message (string), AccessToken (string), RefreshToken (string).

### Step 2: Implement LoginForm
Use zap-button with loading prop. When isLoading is true, set label to Signing In..., loading attribute to empty string, and disabled to true.

### Step 3: Register Router
Configure in src/app/router.tsx so both /login and root / point to the Login page.

## Important Notes
- Always use navigate from react-router-dom instead of window.location.href to avoid page reload.
- Ensure globals.d.ts fully declares all zap-* tags to avoid TypeScript errors.
- Login-specific styles (background, centering) should be placed in PageLogin.tsx so they do not affect the Dashboard Layout.
