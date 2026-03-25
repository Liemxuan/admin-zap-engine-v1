import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Product, ProductListParams } from '../types';
import { productService } from '../services';

export const useProducts = (initialParams: ProductListParams = { pageIndex: 1, pageSize: 6 }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Stabilize initial params
    const initialParamsRef = useRef(initialParams);

    // Get current page from URL or fallback
    const urlPageIndex = parseInt(searchParams.get('p') || '1', 10);

    const [params, setParams] = useState<ProductListParams>(() => ({
        ...initialParamsRef.current,
        pageIndex: urlPageIndex
    }));

    // If URL page changes (Back/Forward buttons), update local state
    useEffect(() => {
        if (urlPageIndex !== params.pageIndex) {
            setParams(prev => ({ ...prev, pageIndex: urlPageIndex }));
        }
    }, [urlPageIndex, params.pageIndex]);

    // Data fetching logic
    const fetchProducts = useCallback(async (currentParams: ProductListParams) => {
        setLoading(true);
        setError(null);
        try {
            const result = await productService.getProducts(currentParams);
            setProducts(result.data);
            setTotal(result.total);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch data when params change
    useEffect(() => {
        fetchProducts(params);
    }, [fetchProducts, params]);

    const handleSearch = (search: string) => {
        setParams(prev => ({ ...prev, search, pageIndex: 1 }));
        setSearchParams(prev => {
            prev.delete('p'); // Reset page in URL
            return prev;
        });
    };

    const handlePageChange = (pageIndex: number) => {
        setParams(prev => ({ ...prev, pageIndex }));
        setSearchParams(prev => {
            if (pageIndex > 1) prev.set('p', pageIndex.toString());
            else prev.delete('p');
            return prev;
        });
    };

    const handleFilter = (filters: Partial<ProductListParams>) => {
        setParams(prev => ({ ...prev, ...filters, pageIndex: 1 }));
        setSearchParams(prev => {
            prev.delete('p'); // Reset page in URL when filtering
            return prev;
        });
    };

    const refresh = () => fetchProducts(params);

    return {
        products,
        total,
        loading,
        error,
        params,
        handleSearch,
        handlePageChange,
        handleFilter,
        refresh
    };
};
