import React from 'react';
import { ProductList } from '../components/ProductList.tsx';
import { MainLayout } from '../../../app/layouts/MainLayout.tsx';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

/**
 * PageProduct displays the list of products in a modern management interface.
 */
export const PageProduct: React.FC = () => {
    const { t } = useLanguage();

    return (
        <MainLayout>
            <div className="p-6 md:p-12 space-y-12">
                {/* Simplified Page Header */}
                <div className="max-w-4xl">
                    <div className="flex items-center space-x-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
                        <div className="w-6 h-[2px] bg-blue-600"></div>
                        <span>{t('product.title')}</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tight text-slate-900 leading-tight mb-4">
                        {t('product.list')}
                    </h1>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-2xl">
                        {t('product.subtitle')}
                    </p>
                </div>

                {/* Product List Component */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative">
                        <ProductList />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};
