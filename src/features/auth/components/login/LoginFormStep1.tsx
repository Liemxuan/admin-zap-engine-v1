import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../../../shared/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { SocialForm } from '../SocialForm';
import { authService } from '../../services/auth.service';

interface Props {
    onNext: (email: string) => void;
}

/**
 * Step 1: Identifier Entry (Email or Phone)
 */
export const LoginFormStep1: React.FC<Props> = ({ onNext }) => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const [identifier, setIdentifier] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<any>(null);
    
    // Validate if it's a basic email or a phone number (simple check)
    const validateIdentifier = (val: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10,11}$/; // Basic VN phone check
        
        if (emailRegex.test(val) || phoneRegex.test(val)) {
            return true;
        }
        return false;
    };

    const handleContinue = async () => {
        setError(null);
        const val = identifier.trim();
        
        if (validateIdentifier(val)) {
            setIsLoading(true);
            try {
                const res = await authService.checkAccount({ 
                    Email: val,
                    IsLogin: true 
                });
                if (res.Success || res.success) {
                    onNext(val);
                }
            } catch (err: any) {
                const data = err.response?.data;
                const errCode = data?.errorCode || data?.ErrorCode;
                if (errCode === 'error_account_not_found') {
                    setError(data?.detail || data?.Detail || t('auth.login.error_account_not_found') || "Email hoặc số điện thoại chưa được đăng ký.");
                } else {
                    setError(data?.detail || data?.Detail || data?.message || data?.Message || "Đã có lỗi xảy ra");
                }
            } finally {
                setIsLoading(false);
            }
        } else {
            setError(t('auth.register.error_email_invalid'));
        }
    };

    useEffect(() => {
        const input = inputRef.current;
        if (!input) return;

        const onInput = (e: any) => {
            const val = e.detail?.value !== undefined ? e.detail.value : e.target.value;
            setIdentifier(val || '');
            if (error) setError(null);
        };

        input.addEventListener('input', onInput);
        return () => input.removeEventListener('input', onInput);
    }, [error]);

    const isBlank = identifier.trim() === '';

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('auth.register.contact')}</label>
                    <button
                        type="button"
                        onClick={() => navigate(`/${language}/forgot-password`)}
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        {t('auth.login.forgot')}
                    </button>
                </div>
                <zap-input
                    ref={inputRef}
                    placeholder={t('auth.register.contactPlaceholder')}
                    value={identifier}
                    icon-start="user"
                    fullwidth
                    error={error ? "" : undefined}
                ></zap-input>
            </div>

            {error && (
                <div className="text-red-500 dark:text-red-400 text-xs font-semibold bg-red-50 dark:bg-red-950/20 p-3 rounded-xl border border-red-100 dark:border-red-900/30 animate-in fade-in slide-in-from-top-1">
                    {error}
                </div>
            )}

            <zap-button
                label={isLoading ? t('auth.register.continue') + "..." : t('auth.register.continue')}
                variant="contained"
                size="large"
                fullwidth
                onClick={handleContinue}
                disabled={isBlank || isLoading}
                loading={isLoading ? "" : undefined}
                style-override="background: #2b7fff; border-radius: 0.75rem; font-weight: 700; height: 3.5rem; font-size: 1rem;"
            ></zap-button>

            <div className="relative flex items-center justify-center py-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
                </div>
                <span className="relative px-4 bg-white dark:bg-slate-950 text-xs font-bold text-slate-400 dark:text-slate-500">{t('auth.signin.social_login')}</span>
            </div>

            <SocialForm />

            <div className="text-center pt-2">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {t('auth.signin.signup_prompt')}{' '}
                    <button
                        onClick={() => navigate(`/${language}/register`)}
                        className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                        {t('auth.signin.signup')}
                    </button>
                </p>
            </div>
        </div>
    );
};
