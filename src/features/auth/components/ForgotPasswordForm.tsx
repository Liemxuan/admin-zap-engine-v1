import React from 'react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useForgotPasswordForm } from '../hooks/useForgotPasswordForm';

export const ForgotPasswordForm: React.FC = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    
    const { 
        email, 
        isLoading, 
        isSubmitted, 
        error, 
        handleSubmit, 
        refs 
    } = useForgotPasswordForm();

    if (isSubmitted) {
        return (
            <div className="text-center space-y-6 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-20 h-20 bg-green-50 dark:bg-green-950/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100 dark:border-green-900/30">
                    <i data-lucide="check-circle" className="w-10 h-10 text-green-500"></i>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {t('auth.forgotPassword.success_title')}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-[280px] mx-auto leading-relaxed">
                        {t('auth.forgotPassword.success_message')}
                    </p>
                </div>
                <div className="pt-4">
                    <zap-button
                        label={t('auth.forgotPassword.backToLogin')}
                        variant="contained"
                        size="large"
                        fullwidth
                        onClick={() => navigate(`/${language}/login`)}
                        style-override="background: #2b7fff; border-radius: 0.75rem; font-weight: 700; height: 3.5rem;"
                    ></zap-button>
                </div>
            </div>
        );
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1">
                <zap-input
                    ref={refs.emailRef}
                    label={t('auth.forgotPassword.email')}
                    type="email"
                    placeholder={t('auth.forgotPassword.emailPlaceholder')}
                    value={email}
                    icon-start="mail"
                    fullwidth
                ></zap-input>
            </div>

            {error && (
                <div className="text-red-500 dark:text-red-400 text-xs font-semibold bg-red-50 dark:bg-red-950/20 p-3 rounded-xl border border-red-100 dark:border-red-900/30 animate-in fade-in slide-in-from-top-1">
                    {error}
                </div>
            )}

            <div className="pt-2">
                <zap-button
                    label={isLoading ? t('auth.forgotPassword.submit') + "..." : t('auth.forgotPassword.submit')}
                    variant="contained"
                    size="large"
                    fullwidth
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    loading={isLoading ? "" : undefined}
                    style-override="background: #2b7fff; border-radius: 0.75rem; font-weight: 700; height: 3.5rem; font-size: 1rem;"
                ></zap-button>
            </div>

            <div className="text-center pt-2">
                <a
                    href={`/${language}/login`}
                    onClick={(e) => { e.preventDefault(); navigate(`/${language}/login`); }}
                    className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-center gap-2"
                >
                    <i data-lucide="arrow-left" className="w-4 h-4"></i>
                    {t('auth.forgotPassword.backToLogin')}
                </a>
            </div>
        </form>
    );
};
