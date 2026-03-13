import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import type { LoginRequest } from '../types/auth.types';
import { STORAGE_KEYS } from '../../../shared/constants';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

/**
 * Hook xử lý logic API Authentication (Login/Logout)
 */
export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { language } = useLanguage();

    const login = async (data: LoginRequest) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.login(data);
            if (response.success || response.Success) {
                localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.AccessToken || '');
                localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.RefreshToken || '');
                localStorage.setItem(STORAGE_KEYS.MERCHANT_NAME, response.MerchantName || '');

                if (data.IsRemember) {
                    localStorage.setItem(STORAGE_KEYS.REMEMBER_USER, data.Email);
                    localStorage.setItem(STORAGE_KEYS.REMEMBER_PASS, data.Password || '');
                    localStorage.setItem(STORAGE_KEYS.IS_REMEMBER, 'true');
                } else {
                    localStorage.removeItem(STORAGE_KEYS.REMEMBER_USER);
                    localStorage.removeItem(STORAGE_KEYS.REMEMBER_PASS);
                    localStorage.setItem(STORAGE_KEYS.IS_REMEMBER, 'false');
                }

                const mName = response.MerchantName || 'zap';
                navigate(`/${language}/${mName}/dashboard`);
            } else {
                const msg = response.message || response.Message || response.detail || response.Detail || 'Login failed';
                setError(msg);
            }
        } catch (err: any) {
            const resData = err.response?.data;
            const msg = resData?.detail || resData?.Detail || resData?.message || resData?.Message || 'Something went wrong.';
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };



    const logout = () => {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.MERCHANT_NAME);
        navigate(`/${language}/login`);
    };

    return { login, logout, isLoading, error };
};

/**
 * Hook xử lý logic riêng cho Giao diện Login Form (State & Events)
 */
export const useLoginForm = () => {
    const { login, isLoading, error } = useLogin(); // Sử dụng hook auth ở trên

    const userRef = useRef<any>(null);
    const passRef = useRef<any>(null);
    const rememberRef = useRef<any>(null);

    const [formData, setFormData] = useState(() => {
        const savedUser = localStorage.getItem(STORAGE_KEYS.REMEMBER_USER) || '';
        const savedPass = localStorage.getItem(STORAGE_KEYS.REMEMBER_PASS) || '';
        const savedIsRemember = localStorage.getItem(STORAGE_KEYS.IS_REMEMBER) !== 'false';

        return {
            Email: savedUser,
            Password: savedPass,
            IsRemember: savedIsRemember,
            Otp: '',
        };
    });

    const handleInput = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
        if (e) e.preventDefault();
        
        // Ensure values are strings (not undefined) for API compatibility
        const payload: LoginRequest = {
            Email: formData.Email,
            Password: formData.Password || '',
            IsRemember: formData.IsRemember,
            Otp: formData.Otp || '',
        };
        
        await login(payload);
    };

    useEffect(() => {
        const onInput = (name: string) => (e: any) => {
            const val = e.detail?.value !== undefined ? e.detail.value : e.target.value;
            if (name === 'IsRemember') {
                const checked = e.detail?.checked !== undefined ? e.detail.checked : e.target.checked;
                handleInput(name, checked);
            } else {
                handleInput(name, val);
            }
        };

        const onKeyDown = (e: any) => {
            if (e.key === 'Enter') handleSubmit();
        };

        const uRef = userRef.current;
        const pRef = passRef.current;
        const rRef = rememberRef.current;

        uRef?.addEventListener('input', onInput('Email'));
        pRef?.addEventListener('input', onInput('Password'));
        rRef?.addEventListener('change', onInput('IsRemember'));

        [uRef, pRef].forEach(ref => ref?.addEventListener('keydown', onKeyDown));

        return () => {
            uRef?.removeEventListener('input', onInput('Email'));
            pRef?.removeEventListener('input', onInput('Password'));
            rRef?.removeEventListener('change', onInput('IsRemember'));
            [uRef, pRef].forEach(ref => ref?.removeEventListener('keydown', onKeyDown));
        };
    }, [formData]);

    const isValid = formData.Email.trim() !== '' && 
                    formData.Password.trim() !== '';

    return {
        formData, isLoading, error, handleSubmit, isValid,
        refs: { userRef, passRef, rememberRef }
    };
};
