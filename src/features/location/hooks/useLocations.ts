import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Location, LocationListParams } from '../types';
import { locationService } from '../services';

export const useLocations = (initialParams: LocationListParams = { pageIndex: 1, pageSize: 10 }) => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [params, setParams] = useState<LocationListParams>(() => ({
        ...initialParams,
        pageIndex: parseInt(searchParams.get('p') || '1', 10),
    }));

    const fetchData = useCallback(async (currentParams: LocationListParams) => {
        setLoading(true);
        setError(null);
        try {
            const result = await locationService.getLocations(currentParams);
            setLocations(result.data);
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

    const handleFilter = (filters: Partial<LocationListParams>) => {
        setParams(prev => ({ ...prev, ...filters, pageIndex: 1 }));
        setSearchParams(prev => { prev.delete('p'); return prev; });
    };

    const refresh = () => fetchData(params);

    return { locations, total, loading, error, params, handleSearch, handlePageChange, handleFilter, refresh };
};
