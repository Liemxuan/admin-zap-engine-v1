import React from 'react';
import { MainLayout } from '../../../app/layouts/MainLayout.tsx';
import { ProductForm } from '../components/ProductForm.tsx';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

export const PageCreateProduct: React.FC = () => {
    const { t } = useLanguage();

    const handleCreateProduct = (data: any) => {
        console.log('Creating product:', data);
        // Add real creation logic here (e.g., call productService or hook)
        alert(t('common.success') + ': ' + data.name);
    };

    return (
        <MainLayout>
            <div className="p-6 md:p-12 space-y-8 max-w-5xl mx-auto">
                {/* Header */}
                <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-blue-500 font-bold text-xs uppercase tracking-[0.2em]">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>{t('product.title')}</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 leading-tight">
                        {t('product.add')}
                    </h1>
                </div>

                {/* Form Card */}
                <zap-card
                    variant="default"
                    padding="2.5rem"
                    border-radius="2rem"
                    className="bg-white"
                >
                    <ProductForm
                        onSubmit={handleCreateProduct}
                    />
                </zap-card>
            </div>
        </MainLayout>
    );
};
