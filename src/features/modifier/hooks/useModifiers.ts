import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Modifier, ModifierListParams } from '../types';
import { modifierService } from '../services';

export const useModifiers = (initialParams: ModifierListParams = { pageIndex: 1, pageSize: 10 }) => {
    const [modifiers, setModifiers] = useState<Modifier[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [params, setParams] = useState<ModifierListParams>(() => ({
        ...initialParams,
        pageIndex: parseInt(searchParams.get('p') || '1', 10),
    }));

    const fetchData = useCallback(async (currentParams: ModifierListParams) => {
        setLoading(true);
        setError(null);
        try {
            const result = await modifierService.getModifiers(currentParams);
            setModifiers(result.data);
            setTotal(result.total);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(params); }, [fetchData, params]);

    const handleSearch = (search: string) => {
        setParams(prev => ({ ...prev, search, pageIndex: 1 }));
        setSearchParams(prev => { prev.delete('p'); return prev; });
    };

    const handlePageChange = (pageIndex: number) => {
        setParams(prev => ({ ...prev, pageIndex }));
        setSearchParams(prev => {
            if (pageIndex > 1) prev.set('p', pageIndex.toString()); else prev.delete('p');
            return prev;
        });
    };

    const handleFilter = (filters: Partial<ModifierListParams>) => {
        setParams(prev => ({ ...prev, ...filters, pageIndex: 1 }));
        setSearchParams(prev => { prev.delete('p'); return prev; });
    };

    const refresh = () => fetchData(params);

    return { modifiers, total, loading, error, params, handleSearch, handlePageChange, handleFilter, refresh };
};
