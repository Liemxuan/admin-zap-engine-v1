import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Edit, Trash2 } from 'lucide-react';
import { useDiscounts } from '../hooks/useDiscounts';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

const getStatusConfig = (t: (key: string) => string) => ({
    active: { label: t('discount.active'), cls: 'bg-green-50 text-green-700' },
    inactive: { label: t('discount.inactive'), cls: 'bg-slate-100 text-slate-500' },
    expired: { label: t('discount.expired'), cls: 'bg-red-50 text-red-600' },
});

export const DiscountList: React.FC = () => {
    const { t, language, isChangingLanguage } = useLanguage();
    const navigate = useNavigate();
    const statusConfig = getStatusConfig(t);
    const { discounts, total, loading: apiLoading, params, handleSearch, handlePageChange } = useDiscounts({ pageIndex: 1, pageSize: 10 });
    const loading = apiLoading || isChangingLanguage;

    const pageIndex = params.pageIndex || 1;
    const pageSize = params.pageSize || 10;
    const totalPages = Math.ceil(total / pageSize);
    const rangeStart = (pageIndex - 1) * pageSize + 1;
    const rangeEnd = Math.min(pageIndex * pageSize, total);

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder={t('discount.search')}
                        value={params.search || ''}
                        onChange={e => handleSearch(e.target.value)}
                        className="w-full pl-9 pr-3 h-9 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder-slate-400"
                    />
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 w-12 whitespace-nowrap">{t('discount.id')}</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 whitespace-nowrap">{t('discount.code')}</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 whitespace-nowrap">{t('discount.name')}</th>
                                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600 whitespace-nowrap">{t('discount.value')}</th>
                                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600 whitespace-nowrap">{t('discount.used')}</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 whitespace-nowrap">{t('discount.expiry')}</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 whitespace-nowrap">{t('discount.status')}</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-slate-600 w-20 whitespace-nowrap">{t('common.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        {Array.from({ length: 8 }).map((_, j) => (
                                            <td key={j} className="px-4 py-3"><div className="h-3 bg-slate-200 rounded w-full" /></td>
                                        ))}
                                    </tr>
                                ))
                            ) : discounts.length > 0 ? (
                                discounts.map((item, index) => {
                                    const s = statusConfig[item.status];
                                    return (
                                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-3 text-slate-500 text-xs">{rangeStart + index}</td>
                                            <td className="px-4 py-3 text-xs font-mono font-bold text-blue-600 uppercase">{item.code}</td>
                                            <td className="px-4 py-3 font-medium text-slate-800">{item.name}</td>
                                            <td className="px-4 py-3 text-right text-xs font-semibold text-green-600">
                                                {item.type === 'percent' ? `${item.value}%` : new Intl.NumberFormat(language === 'vi' ? 'vi-VN' : 'en-US', { style: 'currency', currency: 'VND' }).format(item.value)}
                                            </td>
                                            <td className="px-4 py-3 text-right text-xs text-slate-600">{item.usageCount}/{item.usageLimit}</td>
                                            <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{item.endDate}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${s.cls}`}>{s.label}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button onClick={() => navigate(`/${language}/discount/${item.id}/edit`)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title={t('common.edit')}>
                                                        <Edit className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title={t('common.delete')}>
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={8} className="px-4 py-12 text-center">
                                        <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                        <p className="text-sm font-medium text-slate-500">{t('discount.notFound')}</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
                    <span className="text-xs text-slate-500">
                        {total > 0 ? `${rangeStart}–${rangeEnd} / ${total} ${t('common.records')}` : `0 ${t('common.records')}`}
                    </span>
                    {totalPages > 1 && (
                        <div className="flex items-center gap-1">
                            <button onClick={() => pageIndex > 1 && handlePageChange(pageIndex - 1)} disabled={pageIndex === 1} className="w-7 h-7 flex items-center justify-center rounded text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs">‹</button>
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-7 h-7 flex items-center justify-center rounded text-xs font-semibold transition-colors ${pageIndex === i + 1 ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{i + 1}</button>
                            ))}
                            <button onClick={() => pageIndex < totalPages && handlePageChange(pageIndex + 1)} disabled={pageIndex === totalPages} className="w-7 h-7 flex items-center justify-center rounded text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs">›</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
