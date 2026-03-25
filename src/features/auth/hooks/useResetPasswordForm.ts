import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/auth.service';

export const useResetPasswordForm = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    // Parse URL params for Token
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token') || '';

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const passwordRef = useRef<any>(null);
    const confirmRef = useRef<any>(null);

    const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
        if (e) e.preventDefault();
        setError(null);

        if (!password || password.length < 6) {
            setError(t('auth.register_error_password_length') || 'Password must be at least 6 characters');
            passwordRef.current?.focus();
            return;
        }

        if (password !== confirmPassword) {
            setError(t('auth.register_error_password_match') || 'Passwords do not match');
            confirmRef.current?.focus();
            return;
        }

        if (!token) {
            setError(t('auth.resetPassword_error_invalid') || 'Invalid or expired reset link.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await authService.resetPassword({
                ConfirmToken: token,
                NewPassword: password,
                ConfirmPassword: confirmPassword
            });
            if (response.success || response.Success) {
                setIsSuccess(true);
                // Auto redirect to login after 3 seconds
                setTimeout(() => {
                    navigate(`/${language}/login`);
                }, 3000);
            } else {
                const msg = response.message || response.Message || response.detail || response.Detail || t('auth.resetPassword_error_general') || 'Failed to reset password.';
                setError(msg);
            }
        } catch (err: any) {
            const resData = err.response?.data;
            const msg = resData?.message || resData?.Message || resData?.detail || resData?.Detail || t('auth.resetPassword_error_general') || 'Failed to reset password. Please try again.';
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    // Manual Event Binding for Custom Elements compatibility
    useEffect(() => {
        const onInput = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: any) => {
            const val = e.detail?.value !== undefined ? e.detail.value : e.target.value;
            setter(val);
        };

        const pRef = passwordRef.current;
        const cRef = confirmRef.current;

        const pHandler = onInput(setPassword);
        const cHandler = onInput(setConfirmPassword);

        const onKeyDown = (e: any) => {
            if (e.key === 'Enter') {
                handleSubmit();
            }
        };

        pRef?.addEventListener('input', pHandler);
        pRef?.addEventListener('keydown', onKeyDown);
        
        cRef?.addEventListener('input', cHandler);
        cRef?.addEventListener('keydown', onKeyDown);

        return () => {
            pRef?.removeEventListener('input', pHandler);
            pRef?.removeEventListener('keydown', onKeyDown);
            
            cRef?.removeEventListener('input', cHandler);
            cRef?.removeEventListener('keydown', onKeyDown);
        };
    }, [password, confirmPassword]);

    return {
        password,
        confirmPassword,
        isLoading,
        isSuccess,
        error,
        handleSubmit,
        refs: {
            passwordRef,
            confirmRef
        }
    };
};
