import React from 'react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { useActiveAccountForm } from '../hooks/useRegister';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const ActiveAccountForm: React.FC = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email') || '';
    const merchantName = searchParams.get('m') || '';

    const { 
        otp, 
        isLoading, 
        error, 
        handleSubmit, 
        handleResend, 
        refs: { otpRef } 
    } = useActiveAccountForm(email, merchantName);

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="text-center space-y-2">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t('auth.activate_instruction')}
                </p>
                <p className="font-semibold text-slate-700 dark:text-slate-300">{email}</p>
            </div>

            <zap-input
                ref={otpRef}
                label={t('auth.activate_otpLabel')}
                placeholder="000000"
                value={otp}
                icon-start="lock"
                fullwidth
                helper-text={otp.length > 0 && otp.length < 6 ? t('auth.activate_error_otp_length') : ''}
                error={otp.length > 0 && otp.length < 6 ? "" : undefined}
            ></zap-input>

            {error && (
                <div className="text-red-500 dark:text-red-400 text-xs font-semibold bg-red-50 dark:bg-red-950/20 p-3 rounded-xl border border-red-100 dark:border-red-900/30 animate-in fade-in slide-in-from-top-1">
                    {error}
                </div>
            )}

            <zap-button
                label={isLoading ? t('auth.activate_submit') + "..." : t('auth.activate_submit')}
                variant="contained"
                size="large"
                fullwidth
                type="submit"
                onClick={(e: any) => handleSubmit(e)}
                disabled={isLoading || otp.length !== 6 ? true : undefined}
                loading={isLoading ? "" : undefined}
                style-override="background: #2b7fff; border-radius: 0.75rem; font-weight: 700; height: 3.5rem; font-size: 1rem;"
            />

            <div className="text-center pt-2 space-y-4">
                <button
                    type="button"
                    className={`text-sm font-semibold hover:underline block mx-auto transition-colors ${isLoading ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed' : 'text-blue-600 dark:text-blue-400'}`}
                    disabled={isLoading}
                    onClick={handleResend}
                >
                    {isLoading ? t('auth.activate_resend') + '...' : t('auth.activate_resend')}
                </button>

                <a
                    href={`/${language}/login`}
                    onClick={(e) => { e.preventDefault(); navigate(`/${language}/login`); }}
                    className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-center gap-2"
                >
                    <i data-lucide="arrow-left" className="w-4 h-4"></i>
                    {t('auth.forgotPassword_backToLogin')}
                </a>
            </div>
        </form>
    );
};