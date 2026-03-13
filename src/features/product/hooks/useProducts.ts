import { useState, useEffect, useCallback } from 'react';
import type { Product, ProductListParams } from '../types';
import { productService } from '../services';

export const useProducts = (initialParams: ProductListParams = { pageIndex: 1, pageSize: 6 }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [params, setParams] = useState<ProductListParams>(initialParams);

    const fetchProducts = useCallback(async (currentParams: ProductListParams) => {
        setLoading(true);
        setError(null);
        try {
            const result = await productService.getProducts(currentParams);
            setProducts(result.data);
            setTotal(result.total);
            setParams(currentParams);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts(params);
    }, [fetchProducts, params]);

    const handleSearch = (search: string) => {
        setParams(prev => ({ ...prev, search, pageIndex: 1 }));
    };

    const handlePageChange = (pageIndex: number) => {
        setParams(prev => ({ ...prev, pageIndex }));
    };

    const refresh = () => {
        fetchProducts(params);
    };

    return {
        products,
        total,
        loading,
        error,
        params,
        handleSearch,
        handlePageChange,
        refresh
    };
};
