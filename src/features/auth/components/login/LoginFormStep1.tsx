import React, { useState } from 'react';
import { useLanguage } from '../../../../shared/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { SocialForm } from '../SocialForm';
import { authService } from '../../services/auth.service';
import { PhoneEmailInput } from '../PhoneEmailInput';

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
                    setError(data?.detail || data?.Detail || t('auth.login_error_account_not_found') || "Email hoặc số điện thoại chưa được đăng ký.");
                } else {
                    setError(data?.detail || data?.Detail || data?.message || data?.Message || "Đã có lỗi xảy ra");
                }
            } finally {
                setIsLoading(false);
            }
        } else {
            setError(t('auth.register_error_email_invalid'));
        }
    };

    const isBlank = identifier.trim() === '';

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('auth.register_contact')}</label>
                    <button
                        type="button"
                        onClick={() => navigate(`/${language}/forgot-password`)}
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        {t('auth.login_forgot')}
                    </button>
                </div>
                <PhoneEmailInput
                    value={identifier}
                    onChange={val => { setIdentifier(val); if (error) setError(null); }}
                    placeholder={t('auth.register_contactPlaceholder')}
                    hasError={!!error}
                />
            </div>

            {error && (
                <div className="text-red-500 dark:text-red-400 text-xs font-semibold bg-red-50 dark:bg-red-950/20 p-3 rounded-xl border border-red-100 dark:border-red-900/30 animate-in fade-in slide-in-from-top-1">
                    {error}
                </div>
            )}

            <zap-button
                label={isLoading ? t('auth.register_continue') + "..." : t('auth.register_continue')}
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
                <span className="relative px-4 bg-white dark:bg-slate-950 text-xs font-bold text-slate-400 dark:text-slate-500">{t('auth.signin_social_login')}</span>
            </div>

            <SocialForm />

            <div className="text-center pt-2">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {t('auth.signin_signup_prompt')}{' '}
                    <button
                        onClick={() => navigate(`/${language}/register`)}
                        className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                        {t('auth.signin_signup')}
                    </button>
                </p>
            </div>
        </div>
    );
};
