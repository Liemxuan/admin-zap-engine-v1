import React from 'react';
import { ProductList } from '../components/ProductList.tsx';
import { MainLayout } from '../../../app/layouts/MainLayout.tsx';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

/**
 * PageProduct displays the list of products in a modern management interface.
 */
export const PageProduct: React.FC = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();

    return (
        <MainLayout title={t('product.list')}>
            <div className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                        <h1 className="text-lg font-bold text-slate-900 whitespace-nowrap truncate">{t('product.list')}</h1>
                        <p className="text-xs text-slate-500 whitespace-nowrap">{t('product.subtitle')}</p>
                    </div>
                    <button
                        onClick={() => navigate(`/${language}/product/create`)}
                        className="flex items-center h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap flex-shrink-0"
                    >
                        {t('product.add')}
                    </button>
                </div>
                <ProductList />
            </div>
        </MainLayout>
    );
};
