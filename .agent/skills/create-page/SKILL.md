---
name: create-page
description: Guide for creating pages and developing features following the Domain-Driven Design (DDD) architecture of ZAP Design Engine.
---

# ZAP Design Engine - System Architecture & Page Creation Guide

This document defines the standards for building the ZAP Design Engine application, focusing on modularity, scalability, and Separation of Concerns.

## 1. Standard Project Structure

src/
  app/                - INITIALIZATION LAYER: System-wide configuration
    router/           - Route definitions (PrivateRoute, PermissionRoute, Lazy loading)
    providers/        - AuthProvider, ThemeProvider, QueryClientProvider...
    layouts/          - Layout templates (MainLayout, AuthLayout, BlankLayout)

  features/           - BUSINESS LAYER: Divided by Domain
    auth/             - Login, register, forgot password
    dashboard/        - System overview
    product/          - Product management
    order/            - Order management
    customer/         - Customer management
    inventory/        - Inventory management
    report/           - Reports & statistics

  shared/             - SHARED LAYER: Reusable resources
    components/       - UI Kits (Button, Input, Modal, Table...)
    services/         - Base API Client (Axios), Helpers
    hooks/            - Shared hooks (useDebounce, useLocalStorage...)
    utils/            - Data processing utilities (format date, currency...)
    constants/        - Enums, config keys, static strings
    types/            - Global interfaces/types

  assets/             - Images, Global Fonts
  styles/             - Global CSS, Design Tokens
  App.tsx             - Entry point assembling Providers & Router

---

## 2. Initialization Layer Details (src/app/)

This is the brain controlling how the application operates. When creating a new page, you frequently interact with this layer to register Routes and Layouts.

### app/router/
- PrivateRoute.tsx: Protects pages that require authentication.
- PermissionRoute.tsx: Checks access permissions (RBAC) before rendering a page.
- index.tsx: Uses React.lazy to optimize performance (Code Splitting).

### app/layouts/
- MainLayout.tsx: Contains Sidebar + Header + Breadcrumb. Used for admin pages.
- AuthLayout.tsx: Used for Login/Register (typically has a background image with a centered form).
- BlankLayout.tsx: Blank page, used for printing or special pages.

---

## 3. Feature Structure (src/features/)

Each Feature is an independent module following an internal structure:

src/features/[feature-name]/
  pages/           - LAYOUT: Calls components & hooks to assemble a complete page.
  components/      - UI & FORM LOGIC: Handles interactions, Validation (LoginForm.tsx).
  hooks/           - FLOW: Manages loading/error, calls services, coordinates data.
  services/        - API: Feature-specific API call functions.
  types/           - MODEL: Defines Request/Response interfaces.
  index.ts         - PUBLIC API: Only exports what external modules need.

---

## 4. New Page Creation Process (6 Standard Steps)

### Step 1: Identify the Feature Domain
If the page belongs to an existing subsystem (e.g. Dashboard), create it inside that directory. If it is a new subsystem, create a new feature directory.

### Step 2: Define the Model (types/)
Define the data structure returned from the API.
Example: export interface Product { id: string; name: string; price: number; }

### Step 3: Write the API Service (services/)
Create functions to fetch/post data.
Example: export const getProducts = () => axiosClient.get(''/products'');

### Step 4: Write the Business Logic Hook (hooks/)
Handle data fetching logic, pagination, filtering (use react-query if available).

### Step 5: Design UI & Components (components/ & pages/)
- Create internal components to handle complex logic.
- Assemble them in pages.

### Step 6: Register the Route (src/app/router/)
Add the page to the routes list, select an appropriate Layout and permissions.

---

## 5. Golden Rules

1. **Don''t Repeat Yourself (DRY)**: If a component is used across 2 different features, move it to shared/components/.
2. **Lean Pages**: Files in pages/ should not contain complex data processing logic. That belongs in hooks/.
3. **Strict Typing**: Never use any. Always define clear Interfaces/Types.
4. **Lazy Loading**: Always import Pages using lazy() to improve initial load performance.
