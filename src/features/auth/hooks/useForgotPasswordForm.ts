import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { authService } from '../services/auth.service';

export const useForgotPasswordForm = () => {
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const emailRef = useRef<any>(null);

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
        if (e) e.preventDefault();
        setError(null);

        if (!email) {
            setError(t('auth.forgotPassword.error_email_required') || 'Email is required');
            emailRef.current?.focus();
            return;
        }

        if (!validateEmail(email)) {
            setError(t('auth.register.error_email_invalid') || 'Invalid email format');
            emailRef.current?.focus();
            return;
        }

        setIsLoading(true);
        try {
            const response = await authService.forgotPassword(email);
            if (response.success || response.Success) {
                setIsSubmitted(true);
            } else {
                const msg = response.message || response.Message || response.detail || response.Detail || 'Failed to send reset link.';
                setError(msg);
            }
        } catch (err: any) {
            const resData = err.response?.data;
            const msg = resData?.detail || resData?.Detail || resData?.message || resData?.Message || 'Failed to send reset link. Please try again.';
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    // Manual Event Binding for Custom Elements compatibility
    useEffect(() => {
        const onInput = (e: any) => {
            const val = e.detail?.value !== undefined ? e.detail.value : e.target.value;
            setEmail(val);
        };

        const eRef = emailRef.current;

        const onKeyDown = (e: any) => {
            if (e.key === 'Enter') {
                handleSubmit();
            }
        };

        eRef?.addEventListener('input', onInput);
        eRef?.addEventListener('keydown', onKeyDown);

        return () => {
            eRef?.removeEventListener('input', onInput);
            eRef?.removeEventListener('keydown', onKeyDown);
        };
    }, [email]);

    return {
        email,
        isLoading,
        isSubmitted,
        error,
        handleSubmit,
        refs: {
            emailRef
        }
    };
};
