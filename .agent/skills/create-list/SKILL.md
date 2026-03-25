---
name: create-list
description: Create a standard ZAP Design List View page — includes Types, Mock Service, Hook, Table Component with Search + Skeleton + Pagination, and Page wrapper. Copy-paste ready.
---

# ZAP Design Engine – Create a List View Page

Standard template for building any list management page (products, customers, orders, etc.).
Replace `{Entity}` / `{entity}` / `{entities}` with the actual name (e.g. `Customer` / `customer` / `customers`).

---

## Folder Structure

```
src/features/{entity}/
├── types/
│   └── index.ts
├── services/
│   ├── {entity}Service.ts
│   └── index.ts
├── hooks/
│   └── use{Entities}.ts
├── components/
│   └── {Entity}List.tsx
├── pages/
│   └── Page{Entity}.tsx
└── index.ts
```

---

## Step 1 — Types (`types/index.ts`)

```typescript
// Define the entity shape
export interface {Entity} {
    id: string;
    name: string;
    // ... add domain-specific fields
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
}

// Params for filtering + pagination
export interface {Entity}ListParams {
    search?: string;
    pageIndex?: number;
    pageSize?: number;
    status?: string;
}

// Generic pagination result wrapper — shared across all lists
export interface PaginatedResult<T> {
    data: T[];
    total: number;
    pageIndex: number;
    pageSize: number;
}
```

---

## Step 2 — Mock Service (`services/{entity}Service.ts`)

```typescript
import type { {Entity}, {Entity}ListParams, PaginatedResult } from '../types';

// Mock data — replace with axiosClient when a real API is available
const mock{Entities}: {Entity}[] = [
    {
        id: '1',
        name: 'Example Item 1',
        status: 'active',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
    },
    {
        id: '2',
        name: 'Example Item 2',
        status: 'inactive',
        createdAt: '2024-01-02',
        updatedAt: '2024-01-02',
    },
    // Add more items...
];

export const {entity}Service = {
    get{Entities}: async (params: {Entity}ListParams): Promise<PaginatedResult<{Entity}>> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        let filtered = [...mock{Entities}];

        // Search by name (extend with additional fields as needed)
        if (params.search) {
            const q = params.search.toLowerCase();
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(q)
            );
        }

        // Filter by status
        if (params.status) {
            filtered = filtered.filter(item => item.status === params.status);
        }

        // Pagination
        const pageIndex = params.pageIndex || 1;
        const pageSize = params.pageSize || 10;
        const total = filtered.length;
        const startIndex = (pageIndex - 1) * pageSize;
        const data = filtered.slice(startIndex, startIndex + pageSize);

        return { data, total, pageIndex, pageSize };
    },

    get{Entity}ById: async (id: string): Promise<{Entity} | null> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mock{Entities}.find(item => item.id === id) || null;
    },
};
```

**`services/index.ts`** (barrel export):
```typescript
export * from './{entity}Service';
```

---

## Step 3 — Hook (`hooks/use{Entities}.ts`)

```typescript
import { useState, useEffect, useCallback } from 'react';
import type { {Entity}, {Entity}ListParams } from '../types';
import { {entity}Service } from '../services';

export const use{Entities} = (initialParams: {Entity}ListParams = { pageIndex: 1, pageSize: 10 }) => {
    const [{entities}, set{Entities}] = useState<{Entity}[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [params, setParams] = useState<{Entity}ListParams>(initialParams);

    const fetchData = useCallback(async (currentParams: {Entity}ListParams) => {
        setLoading(true);
        setError(null);
        try {
            const result = await {entity}Service.get{Entities}(currentParams);
            set{Entities}(result.data);
            setTotal(result.total);
            setParams(currentParams);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(params);
    }, [fetchData, params]);

    const handleSearch = (search: string) => {
        setParams(prev => ({ ...prev, search, pageIndex: 1 }));
    };

    const handlePageChange = (pageIndex: number) => {
        setParams(prev => ({ ...prev, pageIndex }));
    };

    const refresh = () => fetchData(params);

    return { {entities}, total, loading, error, params, handleSearch, handlePageChange, refresh };
};
```

---

## Step 4 — List Component (`components/{Entity}List.tsx`)

> This is the most important part. Copy entirely, only change the entity name and columns in `<thead>` / `<tbody>`.

```tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Edit, Trash2 } from 'lucide-react';
import { use{Entities} } from '../hooks/use{Entities}';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

export const {Entity}List: React.FC = () => {
    const { t, language, isChangingLanguage } = useLanguage();
    const navigate = useNavigate();
    const {
        {entities},
        total,
        loading,
        params,
        handleSearch,
        handlePageChange,
    } = use{Entities}({ pageIndex: 1, pageSize: 10 });

    const isDataLoading = loading || isChangingLanguage;

    const pageIndex = params.pageIndex || 1;
    const pageSize = params.pageSize || 10;
    const totalPages = Math.ceil(total / pageSize);
    const rangeStart = (pageIndex - 1) * pageSize + 1;
    const rangeEnd = Math.min(pageIndex * pageSize, total);

    return (
        <div className="space-y-3">
            {/* Search Bar */}
            <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder={t('{entity}.search') || 'Search...'}
                        value={params.search || ''}
                        onChange={e => handleSearch(e.target.value)}
                        className="w-full pl-9 pr-3 h-9 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder-slate-400"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-12 whitespace-nowrap">{t('{entity}.id') || 'ID'}</th>
                                {/* === ADD/EDIT COLUMNS HERE === */}
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{t('{entity}.name') || 'Name'}</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{t('{entity}.status') || 'Status'}</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide w-20 whitespace-nowrap">{t('common.actions') || 'Actions'}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isDataLoading ? (
                                // Skeleton rows
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-4 py-3"><div className="h-3 bg-slate-200 rounded w-6" /></td>
                                        <td className="px-4 py-3"><div className="h-3 bg-slate-200 rounded w-32" /></td>
                                        <td className="px-4 py-3"><div className="h-5 bg-slate-200 rounded-full w-16" /></td>
                                        <td className="px-4 py-3"><div className="h-5 bg-slate-200 rounded w-12 mx-auto" /></td>
                                    </tr>
                                ))
                            ) : {entities}.length > 0 ? (
                                {entities}.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-3 text-slate-500 text-xs">{rangeStart + index}</td>
                                        {/* === ADD/EDIT DATA HERE === */}
                                        <td className="px-4 py-3 font-medium text-slate-800">{item.name}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                                                item.status === 'active'
                                                    ? 'bg-green-50 text-green-700'
                                                    : 'bg-red-50 text-red-600'
                                            }`}>
                                                {item.status === 'active' ? (t('{entity}.active') || 'Active') : (t('{entity}.inactive') || 'Inactive')}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-center gap-1">
                                                <button
                                                    onClick={() => navigate(`/${language}/{entity}/${item.id}/edit`)}
                                                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                    title={t('common.edit') || 'Edit'}
                                                >
                                                    <Edit className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => {/* TODO: delete handler */}}
                                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                    title={t('common.delete') || 'Delete'}
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                // Empty state
                                <tr>
                                    <td colSpan={4} className="px-4 py-12 text-center">
                                        <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                        <p className="text-sm font-medium text-slate-500">{t('{entity}.notFound') || 'No data found'}</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
                    <span className="text-xs text-slate-500">
                        {total > 0 ? `${rangeStart}–${rangeEnd} / ${total} ${t('common.records') || 'records'}` : `0 ${t('common.records') || 'records'}`}
                    </span>

                    {totalPages > 1 && (
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => pageIndex > 1 && handlePageChange(pageIndex - 1)}
                                disabled={pageIndex === 1}
                                className="w-7 h-7 flex items-center justify-center rounded text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs"
                            >
                                ‹
                            </button>
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`w-7 h-7 flex items-center justify-center rounded text-xs font-semibold transition-colors ${
                                        pageIndex === i + 1
                                            ? 'bg-blue-600 text-white'
                                            : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => pageIndex < totalPages && handlePageChange(pageIndex + 1)}
                                disabled={pageIndex === totalPages}
                                className="w-7 h-7 flex items-center justify-center rounded text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs"
                            >
                                ›
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
```

---

## Step 5 — Page (`pages/Page{Entity}.tsx`)

```tsx
import React from 'react';
import { MainLayout } from '../../../app/layouts/MainLayout.tsx';
import { {Entity}List } from '../components/{Entity}List.tsx';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

export const Page{Entity}: React.FC = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();

    return (
        <MainLayout>
            <div className="p-6 space-y-4">
                {/* Header: title + add button on the same row */}
                <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                        <h1 className="text-lg font-bold text-slate-900 whitespace-nowrap truncate">
                            {t('{entity}.title') || '{entity} list'}
                        </h1>
                        <p className="text-xs text-slate-500 whitespace-nowrap">
                            {t('{entity}.subtitle') || 'Short description for this list'}
                        </p>
                    </div>
                    <button
                        onClick={() => navigate(`/${language}/{entity}/create`)}
                        className="flex items-center h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap flex-shrink-0"
                    >
                        {t('{entity}.add') || 'Add new'}
                    </button>
                </div>

                <{Entity}List />
            </div>
        </MainLayout>
    );
};
```

---

## Step 6 — Locale Files (i18n)

Create 2 locale files in parallel — **EN** and **VI** — then register them in the index.

### `src/shared/locales/en/{entity}.ts`

```typescript
export const {entity} = {
    title: '{Entity list title}',
    subtitle: 'Manage {entities} and their details.',
    add: 'Add {entity}',
    edit: 'Edit {entity}',
    delete: 'Delete {entity}',
    id: 'ID',
    name: '{Entity} name',
    status: 'Status',
    active: 'Active',
    inactive: 'Inactive',
    search: 'Search {entities}...',
    namePlaceholder: 'Enter {entity} name...',
    notFound: 'No {entities} found',
    // Add domain-specific fields...
};
```

### `src/shared/locales/vi/{entity}.ts`

```typescript
export const {entity} = {
    title: 'Tên danh sách',
    subtitle: 'Quản lý các {entity} và thông tin liên quan.',
    add: 'Thêm {entity}',
    edit: 'Chỉnh sửa {entity}',
    delete: 'Xoá {entity}',
    id: 'ID',
    name: 'Tên {entity}',
    status: 'Trạng thái',
    active: 'Hoạt động',
    inactive: 'Tắt',
    search: 'Tìm kiếm {entity}...',
    namePlaceholder: 'Nhập tên {entity}...',
    notFound: 'Không tìm thấy {entity} nào',
    // Add domain-specific fields...
};
```

### Register in `src/shared/locales/en/index.ts` and `vi/index.ts`

```typescript
import { {entity} } from './{entity}';   // add import line

export const en = {
    // ... existing keys
    {entity},                              // add to object
};
```

> ⚠️ **Locale string casing rules:**
> - Only capitalize the **first letter** of the entire string (`'Add category'`, not `'Add Category'`)
> - No ALL CAPS (`'STATUS'` → `'Status'`)
> - Description sentences (subtitle): capitalize first word only (`'Manage categories to classify products.'`)

---

## Step 7 — Register Route

In the router file (usually `src/app/router.tsx` or `src/app/routes.tsx`), add:

```tsx
import { Page{Entity} } from '../features/{entity}/pages/Page{Entity}';

// In the routes array:
{
    path: '/:language/:merchantName/{entity}',
    element: <Page{Entity} />,
},
```

---

## Step 8 — Sidebar Link (optional)

In `src/app/layouts/MainLayout.tsx`, add a link to the sidebar:

```tsx
// After the isProductPage declaration:
const is{Entity}Page = location.pathname.includes('/{entity}');

// In <nav>, add link:
<Link
    to={`/${language}/${merchantName}/{entity}`}
    className={`block px-3 py-2 rounded-md text-sm transition-all cursor-pointer ${
        is{Entity}Page
            ? 'bg-blue-50 text-blue-600 font-bold border border-blue-100'
            : 'text-slate-500 hover:bg-emerald-50/50 hover:text-emerald-600'
    }`}
>
    Menu Name
</Link>
```

---

## Mandatory Rules

| Rule | Details |
|------|---------|
| **Skeleton** | Always use `animate-pulse` when `loading === true`, 5 rows |
| **Empty state** | Show icon + text when `data.length === 0` |
| **Pagination reset** | `handleSearch` must reset `pageIndex: 1` |
| **whitespace-nowrap** | All `<th>` must have `whitespace-nowrap` to prevent line wrapping |
| **Compact text** | Header uses `text-lg`, cells use `text-xs`/`text-sm`, avoid `text-xl` and above |
| **overflow-x-auto** | Wrap table in `div.overflow-x-auto` for responsive layout |
| **Status badge** | Use `bg-green-50 text-green-700` (active) / `bg-red-50 text-red-600` (inactive) |
| **Action buttons** | Edit = blue hover, Delete = red hover, icon size `w-3.5 h-3.5` |
| **I18n** | Always use `t()` for all displayed strings, never hardcode text. |
| **Smooth Transition** | When switching language, the system automatically shows a 2s loading overlay for a smooth transition. |

---

## Checklist for Creating a New List

- [ ] Created `types/index.ts` with Entity + Params + PaginatedResult?
- [ ] Mock service has search + pagination logic?
- [ ] Hook uses `useCallback` for `fetchData`, `useEffect` for auto-fetch?
- [ ] `handleSearch` resets `pageIndex: 1`?
- [ ] Component has skeleton (loading), empty state, and pagination?
- [ ] All `<th>` have `whitespace-nowrap`?
- [ ] Page header: title + button on the same row (`justify-between`)?
- [ ] All displayed text uses `t()`?
- [ ] Created `src/shared/locales/en/{entity}.ts`?
- [ ] Created `src/shared/locales/vi/{entity}.ts`?
- [ ] Imported and registered in both `en/index.ts` and `vi/index.ts`?
- [ ] All locale strings: first letter capitalized only, no ALL CAPS, no Title Case?
- [ ] Route registered?
