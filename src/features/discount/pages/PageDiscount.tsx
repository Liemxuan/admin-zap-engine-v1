import React from 'react';
import { MainLayout } from '../../../app/layouts/MainLayout.tsx';
import { DiscountList } from '../components/DiscountList.tsx';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

export const PageDiscount: React.FC = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();

    return (
        <MainLayout>
            <div className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                        <h1 className="text-lg font-bold text-slate-900 whitespace-nowrap truncate">{t('discount.title')}</h1>
                        <p className="text-xs text-slate-500 whitespace-nowrap">{t('discount.subtitle')}</p>
                    </div>
                    <button
                        onClick={() => navigate(`/${language}/discount/create`)}
                        className="flex items-center h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap flex-shrink-0"
                    >
                        {t('discount.add')}
                    </button>
                </div>
                <DiscountList />
            </div>
        </MainLayout>
    );
};

