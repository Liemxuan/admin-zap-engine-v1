import React, { useState } from 'react';
import type { Product } from '../types';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

interface ProductFormProps {
    product?: Partial<Product>;
    onSubmit: (data: Partial<Product>) => void;
    isLoading?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, isLoading }) => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState<Partial<Product>>({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || 0,
        image: product?.image || '',
        category: product?.category || '',
        status: product?.status || 'available',
    });

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        onSubmit(formData);
    };

    const handleInput = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <zap-input
                    label={t('product.name')}
                    placeholder={t('product.namePlaceholder')}
                    value={formData.name}
                    onInput={(e: any) => handleInput('name', e.target.value)}
                    fullwidth
                    required
                ></zap-input>

                {/* Category */}
                <zap-input
                    label={t('product.category')}
                    placeholder={t('product.categoryPlaceholder')}
                    value={formData.category}
                    onInput={(e: any) => handleInput('category', e.target.value)}
                    fullwidth
                ></zap-input>

                {/* Price */}
                <zap-input
                    label={t('product.price')}
                    type="number"
                    placeholder={t('product.pricePlaceholder')}
                    value={formData.price?.toString()}
                    onInput={(e: any) => handleInput('price', Number(e.target.value))}
                    fullwidth
                    required
                ></zap-input>

                {/* Image URL */}
                <zap-input
                    label={t('product.image')}
                    placeholder={t('product.imagePlaceholder')}
                    value={formData.image}
                    onInput={(e: any) => handleInput('image', e.target.value)}
                    fullwidth
                ></zap-input>
            </div>

            {/* Description */}
            <zap-input
                label={t('product.description')}
                placeholder={t('product.descriptionPlaceholder')}
                value={formData.description}
                onInput={(e: any) => handleInput('description', e.target.value)}
                fullwidth
                variant="large"
            ></zap-input>

            {/* Status */}
            <div className="flex items-center space-x-2 py-2">
                <zap-switch
                    label={t('product.status')}
                    checked={formData.status === 'available'}
                    onChange={(e: any) => handleInput('status', e.target.checked ? 'available' : 'out_of_stock')}
                ></zap-switch>
                <span className="text-sm text-slate-500 font-medium">
                    {formData.status === 'available' ? t('product.available') : t('product.outOfStock')}
                </span>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
                <zap-button
                    label={t('common.cancel')}
                    variant="outlined"
                    onClick={() => window.history.back()}
                ></zap-button>
                <zap-button
                    label={isLoading ? t('common.save') + "..." : t('common.save')}
                    variant="premium"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    loading={isLoading ? "" : undefined}
                    style-override="min-width: 120px;"
                ></zap-button>
            </div>
        </form>
    );
};
