import { useNavigate } from 'react-router-dom';
import { Search, Eye, Edit, Trash2, MoreHorizontal, SlidersHorizontal } from 'lucide-react';
import { useProducts } from '../hooks/useProducts.ts';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

export const ProductList: React.FC = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const { 
        products, 
        total, 
        loading, 
        params, 
        handleSearch, 
        handlePageChange 
    } = useProducts({ pageIndex: 1, pageSize: 12 });

    const totalPages = Math.ceil(total / (params.pageSize || 12));

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleSearch(e.target.value);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Premium Action Bar - Search & Add Combined */}
            <div className="bg-white/90 backdrop-blur-md p-4 md:p-5 rounded-3xl border border-slate-200 shadow-xl shadow-blue-500/5 flex flex-col lg:flex-row lg:items-center justify-between gap-5 transition-all duration-300 hover:shadow-blue-500/10">
                {/* Search Side */}
                <div className="flex flex-1 items-center gap-4">
                    <div className="relative group w-full max-w-[480px]">
                        <zap-input
                            icon-start="search"
                            placeholder={t('product.placeholders.search')}
                            value={params.search || ''}
                            onInput={onSearchChange}
                            fullwidth
                            variant="medium"
                            style-override="input-style: background: #f8fafc; border-radius: 1rem; border: none; box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.02);"
                        ></zap-input>
                    </div>
                    
                    <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-slate-50 text-slate-500 rounded-2xl hover:bg-slate-100 hover:text-slate-900 transition-all font-bold text-sm border border-slate-100">
                        <SlidersHorizontal className="w-4 h-4" />
                        <span>Filters</span>
                    </button>
                </div>

                {/* Right Side: Total & Add Button */}
                <div className="flex items-center gap-6">
                    <div className="hidden xl:flex flex-col items-end gap-0.5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Database</span>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-sm font-black text-slate-800 tracking-tight">{total} {t('product.list')}</span>
                        </div>
                    </div>
                    
                    <div className="w-[1px] h-10 bg-slate-100 hidden xl:block"></div>

                    <zap-button 
                        label={t('product.add')} 
                        variant="premium" 
                        size="large" 
                        icon="plus"
                        onClick={() => navigate(`/${language}/product/create`)}
                        style-override="background: linear-gradient(135deg, #2b7fff 0%, #1e5cff 100%); border-radius: 1.25rem; font-weight: 800; padding: 0 1.5rem; height: 3.25rem; box-shadow: 0 10px 20px -5px rgba(43, 127, 255, 0.4);"
                    ></zap-button>
                </div>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-slate-800">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-200">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('product.fields.name')}</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('product.fields.category')}</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">{t('product.fields.price')}</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('product.fields.status')}</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">{t('common.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-slate-200 rounded-lg" />
                                                <div className="space-y-2">
                                                    <div className="h-4 bg-slate-200 rounded w-48" />
                                                    <div className="h-3 bg-slate-100 rounded w-32" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-20" /></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-24 ml-auto" /></td>
                                        <td className="px-6 py-4"><div className="h-6 bg-slate-200 rounded-full w-16" /></td>
                                        <td className="px-6 py-4"><div className="h-8 bg-slate-200 rounded-lg w-20 mx-auto" /></td>
                                    </tr>
                                ))
                            ) : products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100 bg-slate-100 shadow-sm transition-transform group-hover:scale-110">
                                                    <img 
                                                        src={product.image} 
                                                        alt={product.name} 
                                                        className="w-full h-full object-cover" 
                                                        onError={(e: any) => {
                                                            e.currentTarget.onerror = null; 
                                                            e.currentTarget.src = '/images/default-product.png';
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold group-hover:text-blue-600 transition-colors">{product.name}</span>
                                                    <span className="text-xs text-slate-500 line-clamp-1 max-w-[250px]">{product.description}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <zap-badge
                                                appearance="outline"
                                                size="sm"
                                                variant="secondary"
                                            >
                                                {product.category}
                                            </zap-badge>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="font-bold text-slate-900">
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <zap-badge
                                                variant={product.status === 'available' ? 'success' : 'destructive'}
                                                appearance="light"
                                                size="sm"
                                                dot
                                            >
                                                {product.status === 'available' ? t('product.fields.available') : t('product.fields.outOfStock')}
                                            </zap-badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center space-x-1 transition-opacity">
                                                <zap-button
                                                    variant="text"
                                                    size="small"
                                                    title={t('common.view')}
                                                >
                                                    <Eye className="w-4 h-4 text-slate-400 hover:text-blue-600" />
                                                </zap-button>
                                                <zap-button
                                                    variant="text"
                                                    size="small"
                                                    title={t('common.edit')}
                                                >
                                                    <Edit className="w-4 h-4 text-slate-400 hover:text-amber-600" />
                                                </zap-button>
                                                <zap-button
                                                    variant="text"
                                                    size="small"
                                                    title={t('common.delete')}
                                                >
                                                    <Trash2 className="w-4 h-4 text-slate-400 hover:text-rose-600" />
                                                </zap-button>
                                                <zap-button
                                                    variant="text"
                                                    size="small"
                                                >
                                                    <MoreHorizontal className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                                                </zap-button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                                                <Search className="w-8 h-8" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="font-semibold text-slate-800">Không tìm thấy sản phẩm nào</p>
                                                <p className="text-sm text-slate-500 text-center max-w-xs">Hãy thử đổi từ khóa tìm kiếm hoặc kiểm tra lại các bộ lọc của bạn.</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Centered Pagination */}
            {totalPages > 1 && (
                <div className="flex flex-col items-center space-y-4 pt-10 pb-6">
                    <div className="flex items-center space-x-3 bg-white p-2 border border-slate-100 rounded-2xl shadow-sm">
                        <zap-button
                            variant="text"
                            size="small"
                            icon="chevron-left"
                            onClick={() => (params.pageIndex || 1) > 1 && handlePageChange((params.pageIndex || 1) - 1)}
                            disabled={(params.pageIndex || 1) === 1 ? "" : undefined}
                            style-override={`width: 2.5rem; height: 2.5rem; min-width: 0; color: #64748b; ${(params.pageIndex || 1) === 1 ? 'pointer-events: none; opacity: 0.5;' : 'cursor: pointer;'}`}
                        ></zap-button>
                        
                        <div className="flex items-center space-x-1 px-2">
                            {Array.from({ length: totalPages }).map((_, i) => {
                                const isCurrent = (params.pageIndex || 1) === i + 1;
                                return (
                                    <zap-button
                                        key={i}
                                        label={(i + 1).toString()}
                                        variant={isCurrent ? "contained" : "text"}
                                        size="small"
                                        onClick={() => !isCurrent && handlePageChange(i + 1)}
                                        style-override={isCurrent
                                            ? "min-width: 2.5rem; height: 2.5rem; background: #2b7fff; border-radius: 0.75rem; font-weight: 800; shadow: 0 4px 12px -2px rgba(43, 127, 255, 0.3); pointer-events: none; cursor: default;" 
                                            : "min-width: 2.5rem; height: 2.5rem; color: #64748b; font-weight: 600; cursor: pointer;"}
                                    ></zap-button>
                                );
                            })}
                        </div>

                        <zap-button
                            variant="text"
                            size="small"
                            icon="chevron-right"
                            onClick={() => (params.pageIndex || 1) < totalPages && handlePageChange((params.pageIndex || 1) + 1)}
                            disabled={(params.pageIndex || 1) === totalPages ? "" : undefined}
                            style-override={`width: 2.5rem; height: 2.5rem; min-width: 0; color: #64748b; ${(params.pageIndex || 1) === totalPages ? 'pointer-events: none; opacity: 0.5;' : 'cursor: pointer;'}`}
                        ></zap-button>
                    </div>
                    
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {t('common.showing')} <span className="text-slate-900">{products.length}</span> {t('common.of')} <span className="text-slate-900">{total}</span> {t('product.list')}
                    </div>
                </div>
            )}
        </div>
    );
};
