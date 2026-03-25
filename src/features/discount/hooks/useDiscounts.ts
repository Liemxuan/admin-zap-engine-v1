import { useState, useEffect, useCallback } from 'react';
import type { Discount, DiscountListParams } from '../types';
import { discountService } from '../services';

export const useDiscounts = (initialParams: DiscountListParams = { pageIndex: 1, pageSize: 10 }) => {
    const [discounts, setDiscounts] = useState<Discount[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [params, setParams] = useState<DiscountListParams>(initialParams);

    const fetchData = useCallback(async (currentParams: DiscountListParams) => {
        setLoading(true);
        setError(null);
        try {
            const result = await discountService.getDiscounts(currentParams);
            setDiscounts(result.data);
            setTotal(result.total);
            setParams(currentParams);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(params); }, [fetchData, params]);

    const handleSearch = (search: string) => setParams(prev => ({ ...prev, search, pageIndex: 1 }));
    const handlePageChange = (pageIndex: number) => setParams(prev => ({ ...prev, pageIndex }));
    const refresh = () => fetchData(params);

    return { discounts, total, loading, error, params, handleSearch, handlePageChange, refresh };
};
