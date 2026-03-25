import React from 'react';
import { Search, Edit, Trash2 } from 'lucide-react';
import { useGroups } from '../hooks/useGroups';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

export const GroupList: React.FC = () => {
    const { t, isChangingLanguage } = useLanguage();
    const { groups, total, loading: apiLoading, params, handleSearch, handlePageChange } = useGroups({ pageIndex: 1, pageSize: 10 });
    const [searchValue, setSearchValue] = React.useState(params.search || '');

    React.useEffect(() => {
        setSearchValue(params.search || '');
    }, [params.search]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch(searchValue);
        }
    };

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
                        placeholder={t('group.search')}
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full pl-9 pr-3 h-9 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder-slate-400"
                    />
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 w-20 whitespace-nowrap">{t('group.id')}</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 whitespace-nowrap">{t('group.name')}</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-slate-600 whitespace-nowrap">{t('group.itemCount')}</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 whitespace-nowrap">{t('group.status')}</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-slate-600 w-20 whitespace-nowrap">{t('common.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-4 py-3"><div className="h-3 bg-slate-200 rounded w-8" /></td>
                                        <td className="px-4 py-3"><div className="h-3 bg-slate-200 rounded w-36" /></td>
                                        <td className="px-4 py-3"><div className="h-3 bg-slate-200 rounded w-10 mx-auto" /></td>
                                        <td className="px-4 py-3"><div className="h-5 bg-slate-200 rounded-full w-16" /></td>
                                        <td className="px-4 py-3"><div className="h-5 bg-slate-200 rounded w-12 mx-auto" /></td>
                                    </tr>
                                ))
                            ) : groups.length > 0 ? (
                                groups.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{item.id}</td>
                                        <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{item.name}</td>
                                        <td className="px-4 py-3 text-center text-xs text-slate-600 whitespace-nowrap">{item.itemCount}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                                                item.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                                            }`}>
                                                {item.status === 'active' ? t('group.active') : t('group.inactive')}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="flex items-center justify-center gap-1">
                                                <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title={t('common.edit')}>
                                                    <Edit className="w-3.5 h-3.5" />
                                                </button>
                                                <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title={t('common.delete')}>
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-4 py-12 text-center">
                                        <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                        <p className="text-sm font-medium text-slate-500">{t('group.notFound')}</p>
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
                            <button onClick={() => pageIndex > 1 && handlePageChange(pageIndex - 1)} disabled={pageIndex === 1} className="w-7 h-7 flex items-center justify-center rounded text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs transition-colors">‹</button>
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
                                        className={`w-7 h-7 flex items-center justify-center rounded text-xs font-semibold transition-colors ${
                                            pageIndex === p ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
                                        }`}
                                    >
                                        {p}
                                    </button>
                                ));
                            })()}
                            <button onClick={() => pageIndex < totalPages && handlePageChange(pageIndex + 1)} disabled={pageIndex === totalPages} className="w-7 h-7 flex items-center justify-center rounded text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs transition-colors">›</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
