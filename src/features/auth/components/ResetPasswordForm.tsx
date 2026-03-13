import React from 'react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useResetPasswordForm } from '../hooks/useResetPasswordForm';

export const ResetPasswordForm: React.FC = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    
    const { 
        password, 
        confirmPassword, 
        isLoading, 
        isSuccess, 
        error, 
        handleSubmit, 
        refs 
    } = useResetPasswordForm();

    if (isSuccess) {
        return (
            <div className="text-center space-y-6 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
                    <i data-lucide="check-circle" className="w-10 h-10 text-green-500"></i>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">
                        {t('auth.resetPassword.success_title')}
                    </h3>
                    <p className="text-slate-500 text-sm max-w-[280px] mx-auto leading-relaxed">
                        {t('auth.resetPassword.success_message')}
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
            <div className="space-y-4">
                <zap-input
                    ref={refs.passwordRef}
                    label={t('auth.register.password')}
                    type="password"
                    placeholder={t('auth.register.passwordPlaceholder')}
                    value={password}
                    icon-start="lock"
                    fullwidth
                ></zap-input>

                <zap-input
                    ref={refs.confirmRef}
                    label={t('auth.register.confirmPassword')}
                    type="password"
                    placeholder={t('auth.register.passwordPlaceholder')}
                    value={confirmPassword}
                    icon-start="lock"
                    fullwidth
                ></zap-input>
            </div>

            {error && (
                <div className="text-red-500 text-xs font-semibold bg-red-50 p-3 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-1">
                    {error}
                </div>
            )}

            <div className="pt-2">
                <zap-button
                    label={isLoading ? t('auth.resetPassword.submitting') : t('auth.resetPassword.submit')}
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
        </form>
    );
};
