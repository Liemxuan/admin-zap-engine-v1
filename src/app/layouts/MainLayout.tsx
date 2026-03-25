import React, { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { useLogin } from '../../features/auth/hooks/useLogin';
import { LogOut, Globe, Check, ChevronDown } from 'lucide-react';

interface MainLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { language, t, setLanguage, isChangingLanguage } = useLanguage();
    const { merchantName } = useParams();
    const { logout } = useLogin();
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const [isItemsOpen, setIsItemsOpen] = useState(true);

    React.useEffect(() => {
        if (title) {
            document.title = `ZAP | ${title}`;
        } else {
            document.title = 'ZAP';
        }
    }, [title]);

    const isProductPage = location.pathname.includes('/product');
    const isCategoryPage = location.pathname.includes('/category');
    const isDiscountPage = location.pathname.includes('/discount');
    const isModifierPage = location.pathname.includes('/modifier');
    const isLocationPage = location.pathname.includes('/location');
    const isCustomerPage = location.pathname.includes('/customer');
    const isGroupPage = location.pathname.includes('/group');
    const isDiningOptionPage = location.pathname.includes('/dining-option');
    const isDashboard = location.pathname.includes('/dashboard');

    const handleLanguageChange = (code: 'vi' | 'en') => {
        setLanguage(code);

        // Update URL path prefix
        const pathSegments = location.pathname.split('/').filter(Boolean);
        if (pathSegments.length > 0 && (pathSegments[0] === 'vi' || pathSegments[0] === 'en')) {
            pathSegments[0] = code;
        } else {
            pathSegments.unshift(code);
        }
        navigate('/' + pathSegments.join('/'));
        setIsLangOpen(false);
    };

    const handleLogout = () => {
        setIsLogoutOpen(false);
        logout();
    };

    return (
        <div className="min-h-screen flex flex-col w-full bg-slate-50 text-slate-900 selection:bg-blue-500/30 font-sans">
            {isChangingLanguage && (
                <div className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300">
                    <div className="w-12 h-12 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mb-4" />
                    <p className="text-sm font-bold text-slate-600 animate-pulse">{t('common.loading')}...</p>
                </div>
            )}
            <div id="app" className="min-h-screen flex flex-col">
                {/* Sidebar / Nav Layout */}
                <div className="flex flex-grow relative">
                    <aside className="w-64 border-r border-slate-200/60 hidden lg:flex flex-col h-screen sticky top-0 bg-white z-[100]">
                        <div className="flex-grow overflow-y-auto p-6 scrollbar-hide">
                            <div className="flex items-center gap-2 mb-8">
                                <div className="w-8 h-8 bg-gradient-to-br from-[#2b7fff] to-[#db2777] rounded-xl flex items-center justify-center text-white font-bold">Z</div>
                                <span className="text-xl font-bold tracking-tight text-slate-900">ZAP Design</span>
                            </div>
                            <nav className="space-y-1">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">{t('sidebar.mainMenu')}</p>

                                <Link
                                    to={`/${language}/${merchantName}/dashboard`}
                                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${isDashboard ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                >
                                    {t('sidebar.dashboard')}
                                </Link>

                                <div className="mt-8 pt-4 border-t border-slate-100">
                                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-4 px-2">{t('sidebar.management')}</p>
                                    <button
                                        onClick={() => setIsItemsOpen(p => !p)}
                                        className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all cursor-pointer text-slate-500 hover:bg-emerald-50/50 hover:text-emerald-600"
                                    >
                                        <span>{t('sidebar.items')}</span>
                                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isItemsOpen ? '' : '-rotate-90'}`} />
                                    </button>
                                    {isItemsOpen && (
                                        <div className="ml-3 pl-3 border-l border-slate-200 space-y-0.5">
                                            <Link
                                                to={`/${language}/${merchantName}/product`}
                                                className={`block px-3 py-2 rounded-md text-sm transition-all cursor-pointer ${isProductPage
                                                    ? 'bg-blue-50 text-blue-600 font-bold border border-blue-100'
                                                    : 'text-slate-500 hover:bg-emerald-50/50 hover:text-emerald-600'
                                                }`}
                                            >
                                                {t('sidebar.products')}
                                            </Link>
                                            <Link
                                                to={`/${language}/${merchantName}/category`}
                                                className={`block px-3 py-2 rounded-md text-sm transition-all cursor-pointer ${isCategoryPage
                                                    ? 'bg-blue-50 text-blue-600 font-bold border border-blue-100'
                                                    : 'text-slate-500 hover:bg-emerald-50/50 hover:text-emerald-600'
                                                }`}
                                            >
                                                {t('sidebar.categories')}
                                            </Link>
                                            <Link
                                                to={`/${language}/${merchantName}/group`}
                                                className={`block px-3 py-2 rounded-md text-sm transition-all cursor-pointer ${isGroupPage
                                                    ? 'bg-blue-50 text-blue-600 font-bold border border-blue-100'
                                                    : 'text-slate-500 hover:bg-emerald-50/50 hover:text-emerald-600'
                                                }`}
                                            >
                                                {t('sidebar.groups')}
                                            </Link>
                                            <Link
                                                to={`/${language}/${merchantName}/modifier`}
                                                className={`block px-3 py-2 rounded-md text-sm transition-all cursor-pointer ${isModifierPage
                                                    ? 'bg-blue-50 text-blue-600 font-bold border border-blue-100'
                                                    : 'text-slate-500 hover:bg-emerald-50/50 hover:text-emerald-600'
                                                }`}
                                            >
                                                {t('sidebar.modifiers')}
                                            </Link>
                                        </div>
                                    )}
                                    <Link
                                        to={`/${language}/${merchantName}/discount`}
                                        className={`block px-3 py-2 rounded-md text-sm transition-all cursor-pointer ${isDiscountPage
                                                ? 'bg-blue-50 text-blue-600 font-bold border border-blue-100'
                                                : 'text-slate-500 hover:bg-emerald-50/50 hover:text-emerald-600'
                                            }`}
                                    >
                                        {t('sidebar.discounts')}
                                    </Link>
                                    <Link
                                        to={`/${language}/${merchantName}/location`}
                                        className={`block px-3 py-2 rounded-md text-sm transition-all cursor-pointer ${isLocationPage
                                                ? 'bg-blue-50 text-blue-600 font-bold border border-blue-100'
                                                : 'text-slate-500 hover:bg-emerald-50/50 hover:text-emerald-600'
                                            }`}
                                    >
                                        {t('sidebar.locations')}
                                    </Link>
                                    <Link
                                        to={`/${language}/${merchantName}/customer`}
                                        className={`block px-3 py-2 rounded-md text-sm transition-all cursor-pointer ${isCustomerPage
                                                ? 'bg-blue-50 text-blue-600 font-bold border border-blue-100'
                                                : 'text-slate-500 hover:bg-emerald-50/50 hover:text-emerald-600'
                                            }`}
                                    >
                                        {t('sidebar.customers')}
                                    </Link>
                                    <Link
                                        to={`/${language}/${merchantName}/dining-option`}
                                        className={`block px-3 py-2 rounded-md text-sm transition-all cursor-pointer ${isDiningOptionPage
                                                ? 'bg-blue-50 text-blue-600 font-bold border border-blue-100'
                                                : 'text-slate-500 hover:bg-emerald-50/50 hover:text-emerald-600'
                                            }`}
                                    >
                                        {t('sidebar.diningOptions')}
                                    </Link>
                                </div>

                                {isDashboard && (
                                    <div className="mt-8 pt-4 border-t border-slate-100 space-y-1">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">{t('sidebar.showcase')}</p>
                                        <a href="#buttons" className="block px-3 py-2 rounded-md hover:bg-slate-50 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">{t('sidebar.buttons')}</a>
                                        <a href="#inputs" className="block px-3 py-2 rounded-md hover:bg-slate-50 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">{t('sidebar.inputs')}</a>
                                        <a href="#checkboxes" className="block px-3 py-2 rounded-md hover:bg-slate-50 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">{t('sidebar.checkboxes')}</a>
                                        <a href="#radios" className="block px-3 py-2 rounded-md hover:bg-slate-50 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">{t('sidebar.radios')}</a>
                                        <a href="#switches" className="block px-3 py-2 rounded-md hover:bg-slate-50 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">{t('sidebar.switches')}</a>
                                        <a href="#badges" className="block px-3 py-2 rounded-md hover:bg-slate-50 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">{t('sidebar.badges')}</a>
                                        <a href="#alerts" className="block px-3 py-2 rounded-md hover:bg-slate-50 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">{t('sidebar.alerts')}</a>
                                        <a href="#cards" className="block px-3 py-2 rounded-md hover:bg-slate-50 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">{t('sidebar.cards')}</a>
                                    </div>
                                )}

                                <div className="mt-8 pt-4 border-t border-slate-100">
                                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-4 px-2">{t('sidebar.ownerSeries')}</p>
                                    <a href="#dialogs" className="block px-3 py-2 rounded-md hover:bg-slate-50 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">{t('sidebar.dialogs')}</a>
                                    <a href="#tabs" className="block px-3 py-2 rounded-md hover:bg-slate-50 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">{t('sidebar.tabs')}</a>
                                    <a href="#accordions" className="block px-3 py-2 rounded-md hover:bg-slate-50 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">{t('sidebar.accordions')}</a>
                                </div>
                            </nav>
                        </div>

                        {/* Sidebar Bottom Section */}
                        <div className="p-4 border-t border-slate-100 bg-white space-y-1 relative z-20">
                            <button
                                onClick={() => setIsLangOpen(true)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-slate-600 hover:bg-blue-50 hover:text-blue-600 group cursor-pointer"
                            >
                                <div className="p-1.5 rounded-md bg-slate-50 group-hover:bg-blue-100/50 transition-colors">
                                    <Globe className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-semibold flex-grow text-left">
                                    {t('sidebar.language')}
                                </span>
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 uppercase">
                                    {language.toUpperCase()}
                                </span>
                            </button>

                            <button
                                onClick={() => setIsLogoutOpen(true)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-slate-600 hover:bg-red-50 hover:text-red-600 group cursor-pointer"
                            >
                                <div className="p-1.5 rounded-md bg-slate-50 group-hover:bg-red-100/50 transition-colors">
                                    <LogOut className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-semibold text-left">{t('sidebar.logout')}</span>
                            </button>
                        </div>
                    </aside>

                    <main className="flex-grow overflow-y-auto bg-slate-50 min-h-screen relative z-10">
                        {children}
                    </main>
                </div>

                {/* Modals for Sidebar Actions */}
                {isLangOpen && (
                    <zap-dialog
                        id="lang-modal"
                        title={t('sidebar.language')}
                        description=""
                        open=""
                    >
                        <div className="grid grid-cols-1 gap-2 pt-2">
                            {[
                                { code: 'vi' as const, name: 'Tiếng Việt', flag: '🇻🇳' },
                                { code: 'en' as const, name: 'English', flag: '🇺🇸' }
                            ].map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageChange(lang.code)}
                                    className={`w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all border cursor-pointer ${language === lang.code
                                            ? 'bg-blue-50 border-blue-200 text-blue-600'
                                            : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-2xl">{lang.flag}</span>
                                        <span className="font-bold text-base">{lang.name}</span>
                                    </div>
                                    {language === lang.code && <Check className="w-5 h-5" />}
                                </button>
                            ))}
                        </div>
                        <div slot="footer" className="w-full flex justify-end">
                            <zap-button label={t('common.cancel')} variant="text" onClick={() => setIsLangOpen(false)}></zap-button>
                        </div>
                    </zap-dialog>
                )}

                {isLogoutOpen && (
                    <zap-dialog
                        id="logout-modal"
                        title={t('auth.logout_title')}
                        description={t('auth.logout_confirm')}
                        open=""
                    >
                        <div slot="footer" className="flex gap-3 justify-end w-full">
                            <zap-button label={t('common.cancel')} variant="outlined" onClick={() => setIsLogoutOpen(false)}></zap-button>
                            <zap-button label={t('sidebar.logout')} variant="contained" color="error" onClick={handleLogout}></zap-button>
                        </div>
                    </zap-dialog>
                )}
            </div>
        </div>
    );
};
