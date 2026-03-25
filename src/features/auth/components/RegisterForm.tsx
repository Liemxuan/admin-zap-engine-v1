import React from 'react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useRegisterForm } from '../hooks/useRegister';

export const RegisterForm: React.FC = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    
    const { 
        formData, 
        isLoading, 
        error, 
        handleSubmit, 
        isValid,
        refs 
    } = useRegisterForm();

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Merchant Identifier */}
            <zap-input
                ref={refs.merchantRef}
                label={t('auth.register_merchantAccount')}
                placeholder={t('auth.register_merchantPlaceholder')}
                value={formData.MerchantName}
                icon-start="building-2"
                fullwidth
            ></zap-input>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <zap-input
                    ref={refs.emailRef}
                    label={t('auth.register_email')}
                    type="email"
                    placeholder={t('auth.register_emailPlaceholder')}
                    value={formData.Email}
                    icon-start="mail"
                    fullwidth
                ></zap-input>

                {/* Phone */}
                <zap-input
                    ref={refs.phoneRef}
                    label={t('auth.register_phone')}
                    placeholder={t('auth.register_phonePlaceholder')}
                    value={formData.Phone}
                    icon-start="phone"
                    fullwidth
                ></zap-input>
            </div>

            {/* Password */}
            <zap-input
                ref={refs.passwordRef}
                label={t('auth.register_password')}
                type="password"
                placeholder={t('auth.register_passwordPlaceholder')}
                value={formData.Password}
                icon-start="lock"
                icon-end="eye-off"
                fullwidth
            ></zap-input>

            {/* Confirm Password */}
            <zap-input
                ref={refs.confirmRef}
                label={t('auth.register_confirmPassword')}
                type="password"
                placeholder={t('auth.register_confirmPlaceholder')}
                value={formData.ConfirmPass}
                icon-start="lock"
                icon-end="eye-off"
                fullwidth
            ></zap-input>

            <div className="py-2">
                <p className="text-[11px] leading-relaxed text-slate-400 font-medium">
                    {t('auth.register_terms_agree')}
                </p>
            </div>

            {error && (
                <div className="text-red-500 text-xs font-semibold bg-red-50 p-3 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-1">
                    {error}
                </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
                <zap-button
                    label={isLoading ? t('auth.register_submit') + "..." : t('auth.register_submit')}
                    variant="contained"
                    size="large"
                    fullwidth
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isLoading || !isValid}
                    loading={isLoading ? "" : undefined}
                    style-override="background: #2b7fff; border-radius: 0.75rem; font-weight: 700; height: 3.5rem; font-size: 1rem;"
                ></zap-button>
            </div>

            {/* Signin prompt */}
            <div className="text-center pt-6">
                <p className="text-sm text-slate-500">
                    {t('auth.signin_signin_prompt')}{' '}
                    <a
                        href={`/${language}/login`}
                        onClick={(e) => { e.preventDefault(); navigate(`/${language}/login`); }}
                        className="text-blue-600 font-bold hover:underline transition-all"
                    >
                        {t('auth.signin_signin')}
                    </a>
                </p>
            </div>
        </form>
    );
};
