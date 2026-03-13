import React from 'react';
import { useLanguage } from '../../../../shared/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useLoginForm } from '../../hooks/useLogin';

interface Props {
    email: string;
    onBack: () => void;
    onSwitchToOtp: () => void;
    isOtpLoading?: boolean;
}

/**
 * Step 2: Password Entry
 */
export const LoginFormStep2: React.FC<Props> = ({ email, onBack, onSwitchToOtp, isOtpLoading }) => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const { formData, isLoading, error, handleSubmit, refs } = useLoginForm();

    // Auto-fill the email from previous step
    React.useEffect(() => {
        if (refs.userRef.current) {
            refs.userRef.current.value = email;
            // Force trigger input event for the hook to catch it
            const event = new CustomEvent('input', { detail: { value: email } });
            refs.userRef.current.dispatchEvent(event);
        }
    }, [email]);

    return (
        <form className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500" onSubmit={handleSubmit}>
            {/* Display and Change Account */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('auth.login.account')}</label>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl flex items-center justify-between border border-slate-100 dark:border-slate-800">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 truncate max-w-[220px]">{email}</span>
                    <button
                        type="button"
                        onClick={onBack}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700"
                    >
                        {t('auth.login.change')}
                    </button>
                </div>
            </div>

            {/* Hidden email input for the hook to capture */}
            <div className="hidden">
                <zap-input ref={refs.userRef} value={email}></zap-input>
            </div>

            <div className="space-y-5">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('auth.login.password')}</label>
                        <button
                            type="button"
                            onClick={() => navigate(`/${language}/forgot-password`)}
                            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            {t('auth.login.forgot')}
                        </button>
                    </div>
                    <zap-input
                        ref={refs.passRef}
                        type="password"
                        placeholder={t('auth.login.passwordPlaceholder')}
                        value={formData.Password}
                        icon-start="lock"
                        fullwidth
                    ></zap-input>
                </div>

                <zap-checkbox
                    ref={refs.rememberRef}
                    label={t('auth.login.remember')}
                    checked={formData.IsRemember}
                ></zap-checkbox>
            </div>

            {error && (
                <div className="text-red-500 dark:text-red-400 text-xs font-semibold bg-red-50 dark:bg-red-950/20 p-3 rounded-xl border border-red-100 dark:border-red-900/30 animate-in fade-in slide-in-from-top-1">
                    {error}
                </div>
            )}

            <zap-button
                label={isLoading ? t('auth.login.submit') + "..." : t('auth.login.submit')}
                variant="contained"
                size="large"
                fullwidth
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading || !formData.Password}
                loading={isLoading ? "" : undefined}
                style-override="background: #2b7fff; border-radius: 0.75rem; font-weight: 700; height: 3.5rem; font-size: 1rem;"
            ></zap-button>

            <zap-button
                variant="outlined"
                size="large"
                fullwidth
                onClick={onSwitchToOtp}
                disabled={isLoading || isOtpLoading}
                loading={isOtpLoading ? "" : undefined}
                style-override="width: 100%; border-radius: 0.75rem; font-weight: 700; height: 3.5rem;"
            >
                <div className="flex items-center justify-center gap-2 text-slate-700 dark:text-slate-300">
                    <i data-lucide="shield-check" className="w-4 h-4 text-blue-600 dark:text-blue-400"></i>
                    <span>{t('auth.login.otp_login')}</span>
                </div>
            </zap-button>
        </form>
    );
};
