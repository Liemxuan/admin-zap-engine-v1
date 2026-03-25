import React from 'react';
import { Search, Edit, Filter, X as CloseIcon, ChevronRight, ArrowLeft } from 'lucide-react';
import { useModifiers } from '../hooks/useModifiers';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { locationService } from '../../location/services';
import type { ModifierListParams } from '../types';

type FilterStep = null | 'location' | 'modifierType';
type TempFilters = { location?: string; modifierType?: string };

export const ModifierList: React.FC = () => {
    const { t, isChangingLanguage } = useLanguage();
    const { modifiers, total, loading: apiLoading, params, handleSearch, handlePageChange, handleFilter } = useModifiers({ pageIndex: 1, pageSize: 10 });
    const [searchValue, setSearchValue] = React.useState(params.search || '');
    const [isFilterOpen, setIsFilterOpen] = React.useState(false);
    const [filterStep, setFilterStep] = React.useState<FilterStep>(null);
    const [tempFilters, setTempFilters] = React.useState<TempFilters>({});
    const [locationOptions, setLocationOptions] = React.useState<string[]>([]);

    React.useEffect(() => {
        locationService.getAllLocations().then(locs => {
            setLocationOptions(locs.map(l => l.name));
        });
    }, []);

    React.useEffect(() => {
        setSearchValue(params.search || '');
    }, [params.search]);

    React.useEffect(() => {
        if (isFilterOpen) {
            setTempFilters({
                location: params.location,
                modifierType: params.modifierType,
            });
        }
    }, [isFilterOpen, params.location, params.modifierType]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch(searchValue);
    };

    const loading = apiLoading || isChangingLanguage;

    const pageIndex = params.pageIndex || 1;
    const pageSize = params.pageSize || 10;
    const totalPages = Math.ceil(total / pageSize);
    const rangeStart = (pageIndex - 1) * pageSize + 1;
    const rangeEnd = Math.min(pageIndex * pageSize, total);

    const activeFilterCount =
        (params.location ? 1 : 0) +
        (params.modifierType ? 1 : 0);

    const locationLabel = (value?: string) => {
        if (!value) return t('common.any');
        if (value === 'All branches') return t('modifier.filterLocAllBranches');
        return value;
    };

    const typeLabel = (value?: string) => {
        if (!value) return t('common.any');
        return value === 'list' ? t('modifier.typeList') : t('modifier.typeText');
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder={t('modifier.search')}
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full pl-9 pr-3 h-9 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder-slate-400"
                    />
                </div>
                <button
                    onClick={() => { setIsFilterOpen(true); setFilterStep(null); }}
                    className={`flex items-center gap-2 h-9 px-3 border rounded-lg transition-colors text-sm font-medium ${activeFilterCount > 0
                        ? 'bg-blue-50 border-blue-200 text-blue-600'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    <Filter className="w-4 h-4" />
                    {t('common.filter')}
                    {activeFilterCount > 0 && (
                        <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-blue-600 text-[10px] text-white font-bold leading-none">
                            {activeFilterCount}
                        </span>
                    )}
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

                        {/* Step: main list */}
                        {filterStep === null && (
                            <>
                                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                                    <button
                                        onClick={() => { setTempFilters({}); handleFilter({ location: undefined, modifierType: undefined }); setIsFilterOpen(false); setFilterStep(null); }}
                                        className="text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors"
                                    >
                                        {t('common.reset')}
                                    </button>
                                    <button
                                        onClick={() => { handleFilter(tempFilters as Partial<ModifierListParams>); setIsFilterOpen(false); setFilterStep(null); }}
                                        className="h-8 px-4 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-700 rounded-lg transition-colors"
                                    >
                                        {t('common.apply')}
                                    </button>
                                    <button
                                        onClick={() => { setIsFilterOpen(false); setFilterStep(null); }}
                                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                    >
                                        <CloseIcon className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="px-5 pt-5 pb-2">
                                    <h2 className="text-xl font-bold text-slate-900">{t('common.filterBy')}</h2>
                                </div>

                                <div className="flex-1 overflow-y-auto">
                                    <button
                                        onClick={() => setFilterStep('location')}
                                        className="w-full flex items-center justify-between px-5 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                    >
                                        <div className="text-left">
                                            <p className="text-sm font-semibold text-slate-800">{t('modifier.filterLocation')}</p>
                                            <p className="text-xs text-slate-400 mt-0.5">{locationLabel(tempFilters.location)}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                    </button>

                                    <button
                                        onClick={() => setFilterStep('modifierType')}
                                        className="w-full flex items-center justify-between px-5 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                    >
                                        <div className="text-left">
                                            <p className="text-sm font-semibold text-slate-800">{t('modifier.filterType')}</p>
                                            <p className="text-xs text-slate-400 mt-0.5">{typeLabel(tempFilters.modifierType)}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Step: location */}
                        {filterStep === 'location' && (
                            <>
                                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                                    <button
                                        onClick={() => setFilterStep(null)}
                                        className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setTempFilters(prev => ({ ...prev, location: undefined }))}
                                        className="text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors"
                                    >
                                        {t('common.reset')}
                                    </button>
                                    <button
                                        onClick={() => { handleFilter(tempFilters as Partial<ModifierListParams>); setIsFilterOpen(false); setFilterStep(null); }}
                                        className="h-8 px-4 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-700 rounded-lg transition-colors"
                                    >
                                        {t('common.apply')}
                                    </button>
                                </div>

                                <div className="px-5 pt-4 pb-2">
                                    <p className="text-xs text-slate-400 font-medium">{t('common.filterBy')}</p>
                                    <h2 className="text-xl font-bold text-slate-900">{t('modifier.filterLocation')}</h2>
                                </div>

                                <div className="flex-1 overflow-y-auto">
                                    {locationOptions.map(loc => ({
                                            value: loc,
                                            label: loc === 'All branches' ? t('modifier.filterLocAllBranches') : loc,
                                        })).map(opt => (
                                        <label key={opt.value} className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                                            <span className="text-sm text-slate-700">{opt.label}</span>
                                            <input
                                                type="radio"
                                                name="modifier-location-filter"
                                                checked={(tempFilters.location ?? '') === opt.value}
                                                onChange={() => setTempFilters(prev => ({ ...prev, location: opt.value || undefined }))}
                                                className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Step: modifierType */}
                        {filterStep === 'modifierType' && (
                            <>
                                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                                    <button
                                        onClick={() => setFilterStep(null)}
                                        className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setTempFilters(prev => ({ ...prev, modifierType: undefined }))}
                                        className="text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors"
                                    >
                                        {t('common.reset')}
                                    </button>
                                    <button
                                        onClick={() => { handleFilter(tempFilters as Partial<ModifierListParams>); setIsFilterOpen(false); setFilterStep(null); }}
                                        className="h-8 px-4 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-700 rounded-lg transition-colors"
                                    >
                                        {t('common.apply')}
                                    </button>
                                </div>

                                <div className="px-5 pt-4 pb-2">
                                    <p className="text-xs text-slate-400 font-medium">{t('common.filterBy')}</p>
                                    <h2 className="text-xl font-bold text-slate-900">{t('modifier.filterType')}</h2>
                                </div>

                                <div className="flex-1 overflow-y-auto">
                                    {[
                                        { value: '', label: t('common.all') },
                                        { value: 'list', label: t('modifier.typeList') },
                                        { value: 'text', label: t('modifier.typeText') },
                                    ].map(opt => (
                                        <label key={opt.value} className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                                            <span className="text-sm text-slate-700">{opt.label}</span>
                                            <input
                                                type="radio"
                                                name="modifier-type-filter"
                                                checked={(tempFilters.modifierType ?? '') === opt.value}
                                                onChange={() => setTempFilters(prev => ({ ...prev, modifierType: opt.value || undefined }))}
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

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 w-12 whitespace-nowrap">{t('modifier.id')}</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 whitespace-nowrap">{t('modifier.name')}</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 whitespace-nowrap">{t('modifier.type')}</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 whitespace-nowrap">{t('modifier.location')}</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 whitespace-nowrap">{t('modifier.details')}</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 whitespace-nowrap">{t('modifier.status')}</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-slate-600 w-20 whitespace-nowrap">{t('common.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        {Array.from({ length: 7 }).map((_, j) => (
                                            <td key={j} className="px-4 py-3"><div className="h-3 bg-slate-200 rounded w-full" /></td>
                                        ))}
                                    </tr>
                                ))
                            ) : modifiers.length > 0 ? (
                                modifiers.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{item.id}</td>
                                        <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{item.name}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                                                item.type === 'list' ? 'bg-blue-50 text-blue-700' : 'bg-violet-50 text-violet-700'
                                            }`}>
                                                {item.type === 'list' ? t('modifier.typeList') : t('modifier.typeText')}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{item.location}</td>
                                        <td className="px-4 py-3 text-xs text-slate-500 max-w-xs truncate">{item.details}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                                                item.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                                            }`}>
                                                {item.status === 'active' ? t('modifier.active') : t('modifier.inactive')}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="flex items-center justify-center gap-1">
                                                <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title={t('common.edit')}>
                                                    <Edit className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-4 py-12 text-center">
                                        <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                        <p className="text-sm font-medium text-slate-500">{t('modifier.notFound')}</p>
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
                                if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);
                                const pages = [];
                                for (let i = startPage; i <= endPage; i++) pages.push(i);
                                return pages.map(p => (
                                    <button
                                        key={p}
                                        onClick={() => handlePageChange(p)}
                                        className={`w-7 h-7 flex items-center justify-center rounded text-xs font-semibold transition-colors ${pageIndex === p ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
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
