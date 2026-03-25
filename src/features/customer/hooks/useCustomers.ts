import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Customer, CustomerListParams } from '../types';
import { customerService } from '../services';

export const useCustomers = (initialParams: CustomerListParams = { pageIndex: 1, pageSize: 10 }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const initialParamsRef = useRef(initialParams);

    const urlPageIndex = parseInt(searchParams.get('p') || '1', 10);
    const urlSearch = searchParams.get('search') || undefined;

    const [params, setParams] = useState<CustomerListParams>(() => ({
        ...initialParamsRef.current,
        pageIndex: urlPageIndex,
        search: urlSearch
    }));

    useEffect(() => {
        if (urlPageIndex !== params.pageIndex || urlSearch !== params.search) {
            setParams(prev => ({ ...prev, pageIndex: urlPageIndex, search: urlSearch }));
        }
    }, [urlPageIndex, urlSearch, params.pageIndex, params.search]);

    const fetchData = useCallback(async (currentParams: CustomerListParams) => {
        setLoading(true);
        setError(null);
        try {
            const result = await customerService.getCustomers(currentParams);
            setCustomers(result.data);
            setTotal(result.total);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(params);
    }, [fetchData, params]);

    const handleSearch = (search: string) => {
        setParams(prev => ({ ...prev, search, pageIndex: 1 }));
        setSearchParams(prev => {
            if (search) prev.set('search', search); else prev.delete('search');
            prev.delete('p');
            return prev;
        });
    };

    const handlePageChange = (pageIndex: number) => {
        setParams(prev => ({ ...prev, pageIndex }));
        setSearchParams(prev => {
            if (pageIndex > 1) prev.set('p', pageIndex.toString()); else prev.delete('p');
            return prev;
        });
    };

    const handleFilter = (filters: Partial<CustomerListParams>) => {
        setParams(prev => ({ ...prev, ...filters, pageIndex: 1 }));
        setSearchParams(prev => {
            prev.delete('p');
            return prev;
        });
    };

    const refresh = () => fetchData(params);

    return { customers, total, loading, error, params, handleSearch, handlePageChange, handleFilter, refresh };
};
