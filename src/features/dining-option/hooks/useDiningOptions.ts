import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { DiningOption, DiningOptionListParams } from '../types';
import { diningOptionService } from '../services';

export const useDiningOptions = (initialParams: DiningOptionListParams = { pageIndex: 1, pageSize: 10 }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [diningOptions, setDiningOptions] = useState<DiningOption[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const initialParamsRef = useRef(initialParams);

    const urlPageIndex = parseInt(searchParams.get('p') || '1', 10);
    const urlSearch = searchParams.get('search') || undefined;
    const urlType = (searchParams.get('type') || '') as DiningOptionListParams['type'];
    const urlStatus = (searchParams.get('status') || '') as DiningOptionListParams['status'];

    const [params, setParams] = useState<DiningOptionListParams>(() => ({
        ...initialParamsRef.current,
        pageIndex: urlPageIndex,
        search: urlSearch,
        type: urlType,
        status: urlStatus,
    }));

    useEffect(() => {
        if (
            urlPageIndex !== params.pageIndex ||
            urlSearch !== params.search ||
            urlType !== params.type ||
            urlStatus !== params.status
        ) {
            setParams(prev => ({ ...prev, pageIndex: urlPageIndex, search: urlSearch, type: urlType, status: urlStatus }));
        }
    }, [urlPageIndex, urlSearch, urlType, urlStatus, params.pageIndex, params.search, params.type, params.status]);

    const fetchData = useCallback(async (currentParams: DiningOptionListParams) => {
        setLoading(true);
        setError(null);
        try {
            const result = await diningOptionService.getDiningOptions(currentParams);
            setDiningOptions(result.data);
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

    const handleFilterChange = (filters: { type?: DiningOptionListParams['type']; status?: DiningOptionListParams['status'] }) => {
        setParams(prev => ({ ...prev, ...filters, pageIndex: 1 }));
        setSearchParams(prev => {
            if (filters.type !== undefined) {
                if (filters.type) prev.set('type', filters.type); else prev.delete('type');
            }
            if (filters.status !== undefined) {
                if (filters.status) prev.set('status', filters.status); else prev.delete('status');
            }
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

    const refresh = () => fetchData(params);

    return { diningOptions, total, loading, error, params, handleSearch, handleFilterChange, handlePageChange, refresh };
};
