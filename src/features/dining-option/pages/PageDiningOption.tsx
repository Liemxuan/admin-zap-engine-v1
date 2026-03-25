import React from 'react';
import { MainLayout } from '../../../app/layouts/MainLayout.tsx';
import { DiningOptionList } from '../components/DiningOptionList.tsx';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

export const PageDiningOption: React.FC = () => {
    const { t } = useLanguage();

    return (
        <MainLayout title={t('diningOption.title')}>
            <div className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                        <h1 className="text-lg font-bold text-slate-900 whitespace-nowrap truncate">{t('diningOption.title')}</h1>
                        <p className="text-xs text-slate-500 whitespace-nowrap">{t('diningOption.subtitle')}</p>
                    </div>
                    <button
                        className="flex items-center h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap flex-shrink-0"
                    >
                        {t('diningOption.add')}
                    </button>
                </div>
                <DiningOptionList />
            </div>
        </MainLayout>
    );
};
