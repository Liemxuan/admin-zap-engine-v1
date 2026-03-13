import React from 'react';
import { Building2 } from 'lucide-react';
import { SignUpForm } from '../components/sign-up';
import { LanguageSelector } from '../components/LanguageSelector';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

export const PageRegister: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen w-full flex bg-[#f8fafc] dark:bg-slate-950 font-sans overflow-hidden transition-colors duration-300">
            {/* Left Column: Hero - Hidden on Mobile */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden group">
                <img
                    src="/images/login-hero.png" // Reuse login hero image
                    alt="Hero"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent dark:from-slate-950 dark:via-slate-950/40"></div>
                
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
                <div className="flex-grow flex flex-col px-8 lg:px-24 pt-12 pb-24 dark:bg-slate-950">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-20">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">ZAP.vn</span>
                        </div>
                        <div className="relative">
                            <LanguageSelector />
                        </div>
                    </div>

                    {/* Register Content */}
                    <SignUpForm />
                </div>

                {/* Legal Links */}
                <div className="p-8 border-t border-slate-100 dark:border-slate-800 mt-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                    <div className="flex gap-8 text-xs font-bold text-slate-500 dark:text-slate-400 justify-start items-center">
                        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-widest">{t('footer.terms')}</a>
                        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-widest">{t('footer.privacy')}</a>
                        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-widest">{t('footer.help')}</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageRegister;
