import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Edit, Trash2, Filter, X as CloseIcon, ChevronRight, ArrowLeft } from 'lucide-react';
import { useProducts } from '../hooks/useProducts.ts';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { categoryService } from '../../category/services/categoryService';
import type { Category } from '../../category/types';

type FilterStep = null | 'category' | 'status';

export const ProductList: React.FC = () => {
    const { t, language, isChangingLanguage } = useLanguage();
    const navigate = useNavigate();
    const [isFilterOpen, setIsFilterOpen] = React.useState(false);
    const [filterStep, setFilterStep] = React.useState<FilterStep>(null);
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [categorySearch, setCategorySearch] = React.useState('');
    const [categoryPageIndex, setCategoryPageIndex] = React.useState(1);
    const categoryPageSize = 10;
    const [tempFilters, setTempFilters] = React.useState<{ status?: string, categories?: string[] }>({ categories: [] });

    const {
        products,
        total,
        loading: apiLoading,
        params,
        handleSearch,
        handlePageChange,
        handleFilter
    } = useProducts({ pageIndex: 1, pageSize: 10 });

    const [searchValue, setSearchValue] = React.useState(params.search || '');

    // Sync local search with params
    React.useEffect(() => {
        setSearchValue(params.search || '');
    }, [params.search]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch(searchValue);
        }
    };

    // Initialize temp filters when opening the panel
    React.useEffect(() => {
        if (isFilterOpen) {
            setTempFilters({
                status: params.status,
                categories: params.categories || []
            });
        }
    }, [isFilterOpen, params.status, params.categories]);

    React.useEffect(() => {
        const fetchCategories = async () => {
            const result = await categoryService.getCategories({ pageSize: 1000 });
            setCategories(result.data);
        };
        fetchCategories();
    }, []);

    const loading = apiLoading || isChangingLanguage;

    const pageIndex = params.pageIndex || 1;
    const pageSize = params.pageSize || 10;
    const totalPages = Math.ceil(total / pageSize);
    const rangeStart = (pageIndex - 1) * pageSize + 1;
    const rangeEnd = Math.min(pageIndex * pageSize, total);

    return (
        <div className="space-y-3">
            {/* Action Bar */}
            <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder={t('product.search')}
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full pl-9 pr-3 h-9 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder-slate-400"
                    />
                </div>
                <button
                    onClick={() => { setIsFilterOpen(true); setFilterStep(null); }}
                    className={`flex items-center gap-2 h-9 px-3 border rounded-lg transition-colors text-sm font-medium ${params.categories?.length || params.status
                        ? 'bg-blue-50 border-blue-200 text-blue-600'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    <Filter className="w-4 h-4" />
                    {t('common.filter') || 'Filter'}
                    {(params.categories?.length || params.status) ? (
                        <span className="flex items-center justify-center min-w-[18px] h-4.5 px-1 rounded-full bg-blue-600 text-[10px] text-white font-bold leading-none">
                            {(params.categories?.length || 0) + (params.status ? 1 : 0)}
                        </span>
                    ) : null}
                </button>
            </div>

            {/* Filter Side Panel */}
            {isFilterOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
                        onClick={() => { setIsFilterOpen(false); setFilterStep(null); }}
                    />
                    <div className="relative w-80 h-full bg-white shadow-2xl flex flex-col">

                        {/* Step 1: Filter list */}
                        {filterStep === null && (
                            <>
                                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                                    <button
                                        onClick={() => {
                                            setTempFilters({ categories: [], status: undefined });
                                        }}
                                        className="text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors"
                                    >
                                        {t('common.reset') || 'Reset all filters'}
                                    </button>
                                    <button
                                        onClick={() => { handleFilter(tempFilters); setIsFilterOpen(false); setFilterStep(null); }}
                                        className="h-8 px-4 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-700 rounded-lg transition-colors"
                                    >
                                        {t('common.apply') || 'Apply'}
                                    </button>
                                    <button
                                        onClick={() => { setIsFilterOpen(false); setFilterStep(null); }}
                                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                    >
                                        <CloseIcon className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="px-5 pt-5 pb-2">
                                    <h2 className="text-xl font-bold text-slate-900">{t('common.filterBy') || 'Filter by'}</h2>
                                </div>

                                <div className="flex-1 overflow-y-auto">
                                    {/* Category row */}
                                    <button
                                        onClick={() => { setFilterStep('category'); setCategorySearch(''); setCategoryPageIndex(1); }}
                                        className="w-full flex items-center justify-between px-5 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                    >
                                        <div className="text-left">
                                            <p className="text-sm font-semibold text-slate-800">{t('product.category') || 'Category'}</p>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                {tempFilters.categories && tempFilters.categories.length > 0
                                                    ? tempFilters.categories.length === 1
                                                        ? tempFilters.categories[0]
                                                        : `${tempFilters.categories[0]}, ...+${tempFilters.categories.length - 1}`
                                                    : (t('common.any') || 'Any')}
                                            </p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                    </button>

                                    {/* Status row */}
                                    <button
                                        onClick={() => setFilterStep('status')}
                                        className="w-full flex items-center justify-between px-5 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                    >
                                        <div className="text-left">
                                            <p className="text-sm font-semibold text-slate-800">{t('product.status') || 'Status'}</p>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                {tempFilters.status === 'available'
                                                    ? (t('product.available') || 'Available')
                                                    : tempFilters.status === 'out_of_stock'
                                                        ? (t('product.outOfStock') || 'Out of stock')
                                                        : (t('common.any') || 'Any')}
                                            </p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Step 2: Category sub-panel */}
                        {filterStep === 'category' && (
                            <>
                                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                                    <button
                                        onClick={() => setFilterStep(null)}
                                        className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setTempFilters(prev => ({ ...prev, categories: [] }))}
                                        className="text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors"
                                    >
                                        {t('common.reset') || 'Reset'}
                                    </button>
                                    <button
                                        onClick={() => { handleFilter(tempFilters); setIsFilterOpen(false); setFilterStep(null); }}
                                        className="h-8 px-4 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-700 rounded-lg transition-colors"
                                    >
                                        {t('common.apply') || 'Apply'}
                                    </button>
                                </div>

                                <div className="px-5 pt-4 pb-2">
                                    <p className="text-xs text-slate-400 font-medium">{t('common.filterBy') || 'Filter by'}</p>
                                    <h2 className="text-xl font-bold text-slate-900">{t('product.category') || 'Category'}</h2>
                                </div>

                                <div className="px-5 pb-3">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder={t('common.search') || 'Search categories'}
                                            value={categorySearch}
                                            onChange={(e) => { setCategorySearch(e.target.value); setCategoryPageIndex(1); }}
                                            className="w-full pl-9 pr-3 h-10 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto">
                                    {(() => {
                                        const filtered = categories.filter(c => c.name.toLowerCase().includes(categorySearch.toLowerCase()));
                                        const catTotal = filtered.length;
                                        const catTotalPages = Math.ceil(catTotal / categoryPageSize);
                                        const paginated = filtered.slice((categoryPageIndex - 1) * categoryPageSize, categoryPageIndex * categoryPageSize);

                                        if (catTotal === 0) return (
                                            <div className="py-10 text-center">
                                                <p className="text-sm text-slate-400">{t('common.notFound') || 'No categories found'}</p>
                                            </div>
                                        );

                                        return (
                                            <>
                                                {paginated.map(cat => (
                                                    <label key={cat.id} className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                                                        <span className="text-sm text-slate-700">{cat.name}</span>
                                                        <input
                                                            type="checkbox"
                                                            checked={tempFilters.categories?.includes(cat.name) ?? false}
                                                            onChange={(e) => {
                                                                const updated = e.target.checked
                                                                    ? [...(tempFilters.categories || []), cat.name]
                                                                    : (tempFilters.categories || []).filter(n => n !== cat.name);
                                                                setTempFilters(prev => ({ ...prev, categories: updated }));
                                                            }}
                                                            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                                                        />
                                                    </label>
                                                ))}
                                                {catTotalPages > 1 && (
                                                    <div className="flex items-center justify-between px-5 py-3">
                                                        <button
                                                            disabled={categoryPageIndex <= 1}
                                                            onClick={() => setCategoryPageIndex(p => p - 1)}
                                                            className="text-xs font-semibold text-slate-500 hover:text-blue-600 disabled:opacity-30 transition-colors"
                                                        >
                                                            ← {t('common.previous') || 'Prev'}
                                                        </button>
                                                        <span className="text-xs text-slate-400">{categoryPageIndex} / {catTotalPages}</span>
                                                        <button
                                                            disabled={categoryPageIndex >= catTotalPages}
                                                            onClick={() => setCategoryPageIndex(p => p + 1)}
                                                            className="text-xs font-semibold text-slate-500 hover:text-blue-600 disabled:opacity-30 transition-colors"
                                                        >
                                                            {t('common.next') || 'Next'} →
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        );
                                    })()}
                                </div>
                            </>
                        )}

                        {/* Step 2: Status sub-panel */}
                        {filterStep === 'status' && (
                            <>
                                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                                    <button
                                        onClick={() => setFilterStep(null)}
                                        className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setTempFilters(prev => ({ ...prev, status: undefined }))}
                                        className="text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors"
                                    >
                                        {t('common.reset') || 'Reset'}
                                    </button>
                                    <button
                                        onClick={() => { handleFilter(tempFilters); setIsFilterOpen(false); setFilterStep(null); }}
                                        className="h-8 px-4 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-700 rounded-lg transition-colors"
                                    >
                                        {t('common.apply') || 'Apply'}
                                    </button>
                                </div>

                                <div className="px-5 pt-4 pb-2">
                                    <p className="text-xs text-slate-400 font-medium">{t('common.filterBy') || 'Filter by'}</p>
                                    <h2 className="text-xl font-bold text-slate-900">{t('product.status') || 'Status'}</h2>
                                </div>

                                <div className="flex-1 overflow-y-auto">
                                    {[
                                        { value: '', label: t('common.all') || 'All' },
                                        { value: 'available', label: t('product.available') || 'Available' },
                                        { value: 'out_of_stock', label: t('product.outOfStock') || 'Out of stock' },
                                    ].map(opt => (
                                        <label key={opt.value} className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                                            <span className="text-sm text-slate-700">{opt.label}</span>
                                            <input
                                                type="radio"
                                                name="status-filter"
                                                checked={(tempFilters.status ?? '') === opt.value}
                                                onChange={() => setTempFilters(prev => ({ ...prev, status: opt.value || undefined }))}
                                                className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 w-12">{t('common.id') || 'ID'}</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">{t('common.code') || 'CODE'}</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">{t('product.name')}</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">{t('product.category')}</th>
                                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600">{t('product.price')}</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">{t('product.status')}</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-slate-600 w-20 whitespace-nowrap">{t('common.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-4 py-3"><div className="h-3 bg-slate-200 rounded w-6" /></td>
                                        <td className="px-4 py-3"><div className="h-3 bg-slate-200 rounded w-16" /></td>
                                        <td className="px-4 py-3"><div className="h-3 bg-slate-200 rounded w-20" /></td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-slate-200 rounded" />
                                                <div className="h-3 bg-slate-200 rounded w-32" />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3"><div className="h-3 bg-slate-200 rounded w-16 ml-auto" /></td>
                                        <td className="px-4 py-3"><div className="h-5 bg-slate-200 rounded-full w-14" /></td>
                                        <td className="px-4 py-3"><div className="h-5 bg-slate-200 rounded w-12 mx-auto" /></td>
                                    </tr>
                                ))
                            ) : products.length > 0 ? (
                                products.map((product, index) => (
                                    <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-3 text-slate-500 text-xs">{rangeStart + index}</td>
                                        <td className="px-4 py-3 text-xs font-mono text-slate-500 uppercase">{product.id?.toString().slice(0, 8) || '—'}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-100">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e: any) => { e.currentTarget.src = '/images/default-product.png'; }}
                                                    />
                                                </div>
                                                <span className="font-medium text-slate-800">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-slate-600 text-xs">{product.category || '—'}</td>

                                        <td className="px-4 py-3 text-right font-semibold text-green-600 text-xs">
                                            {new Intl.NumberFormat(language === 'vi' ? 'vi-VN' : 'en-US', { style: 'currency', currency: 'VND' }).format(product.price)}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${product.status === 'available'
                                                ? 'bg-green-50 text-green-700'
                                                : 'bg-red-50 text-red-600'
                                                }`}>
                                                {product.status === 'available' ? t('product.available') : t('product.outOfStock')}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-center gap-1">
                                                <button
                                                    onClick={() => navigate(`/${language}/product/${product.id}/edit`)}
                                                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                    title={t('common.edit')}
                                                >
                                                    <Edit className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                    title={t('common.delete')}
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-4 py-12 text-center">
                                        <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                        <p className="text-sm font-medium text-slate-500">{t('common.notFound')}</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
                    <span className="text-xs text-slate-500">
                        {total > 0 ? `${rangeStart}–${rangeEnd} / ${total} ${t('common.records')}` : `0 ${t('common.records')}`}
                    </span>

                    {totalPages > 1 && (
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => pageIndex > 1 && handlePageChange(pageIndex - 1)}
                                disabled={pageIndex === 1}
                                className="w-7 h-7 flex items-center justify-center rounded text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs transition-colors"
                            >
                                ‹
                            </button>
                            {(() => {
                                let startPage = Math.max(1, pageIndex - 2);
                                let endPage = Math.min(totalPages, startPage + 4);

                                if (endPage - startPage < 4) {
                                    startPage = Math.max(1, endPage - 4);
                                }

                                const pages = [];
                                for (let i = startPage; i <= endPage; i++) {
                                    pages.push(i);
                                }

                                return pages.map(p => (
                                    <button
                                        key={p}
                                        onClick={() => handlePageChange(p)}
                                        className={`w-7 h-7 flex items-center justify-center rounded text-xs font-semibold transition-colors ${pageIndex === p ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ));
                            })()}
                            <button
                                onClick={() => pageIndex < totalPages && handlePageChange(pageIndex + 1)}
                                disabled={pageIndex === totalPages}
                                className="w-7 h-7 flex items-center justify-center rounded text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs transition-colors"
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
