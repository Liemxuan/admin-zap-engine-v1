import React from 'react';
import { Building2 } from 'lucide-react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';
import { LanguageSelector } from '../components/LanguageSelector';

export const PageForgotPassword: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen w-full flex bg-white font-sans overflow-hidden">
            {/* Left Column: Hero - Hidden on Mobile */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden group">
                <img
                    src="/images/login-hero.png"
                    alt="Hero"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-20 left-16 right-16 text-white max-w-lg animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <h1 className="text-5xl font-black mb-6 leading-tight tracking-tight drop-shadow-sm">
                        {t('auth.hero.title')}
                    </h1>
                    <p className="text-xl text-slate-100/90 leading-relaxed font-medium">
                        {t('auth.hero.subtitle')}
                    </p>
                </div>
            </div>

            {/* Right Column: Form Side */}
            <div className="w-full lg:w-1/2 flex flex-col h-screen overflow-y-auto">
                <div className="flex-grow flex flex-col px-8 lg:px-24 pt-12 pb-24">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-20">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <span className="text-2xl font-black text-slate-900 tracking-tight">ZAP.vn</span>
                        </div>
                        <div className="relative">
                            <LanguageSelector />
                        </div>
                    </div>

                    {/* Forgot Password Content */}
                    <div className="max-w-[420px] w-full mx-auto">
                        <div className="mb-10 text-left">
                            <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
                                {t('auth.forgotPassword.title')}
                            </h2>
                            <p className="text-slate-500 text-base font-medium">
                                {t('auth.forgotPassword.subtitle')}
                            </p>
                        </div>

                        {/* Forgot Password Form component */}
                        <ForgotPasswordForm />
                    </div>
                </div>

                {/* Legal Links - Sticky to bottom */}
                <div className="p-8 border-t border-slate-100 mt-auto bg-white/80 backdrop-blur-sm">
                    <div className="flex gap-8 text-xs font-bold text-slate-500 justify-start items-center">
                        <a href="#" className="hover:text-blue-600 transition-colors uppercase tracking-widest">{t('footer.terms')}</a>
                        <a href="#" className="hover:text-blue-600 transition-colors uppercase tracking-widest">{t('footer.privacy')}</a>
                        <a href="#" className="hover:text-blue-600 transition-colors uppercase tracking-widest">{t('footer.help')}</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageForgotPassword;
