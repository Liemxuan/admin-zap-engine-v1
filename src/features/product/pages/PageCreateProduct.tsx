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
            <div className="p-6 space-y-4 max-w-5xl mx-auto">
                {/* Header */}
                <div>
                    <h1 className="text-lg font-bold text-slate-900 whitespace-nowrap">{t('product.add')}</h1>
                    <p className="text-xs text-slate-500 whitespace-nowrap">{t('product.subtitle')}</p>
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
