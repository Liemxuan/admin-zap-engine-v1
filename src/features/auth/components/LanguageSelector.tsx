import React, { useState } from 'react';
import { Globe, ChevronDown, Check, Moon, Sun } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { useTheme } from '../../../shared/contexts/ThemeContext';

export const LanguageSelector: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const languages = [
        { code: 'vi' as const, name: 'Tiếng Việt', flag: '🇻🇳' },
        { code: 'en' as const, name: 'English', flag: '🇺🇸' }
    ];

    const currentLang = languages.find(l => l.code === language) || languages[0];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleLanguageChange = (code: 'vi' | 'en') => {
        setLanguage(code);
        setIsOpen(false);
        
        // Update URL to match new language
        const pathSegments = location.pathname.split('/').filter(Boolean);
        if (pathSegments.length > 0 && (pathSegments[0] === 'vi' || pathSegments[0] === 'en')) {
            pathSegments[0] = code;
        } else {
            pathSegments.unshift(code);
        }
        navigate('/' + pathSegments.join('/'));
    };

    return (
        <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 border border-slate-100 dark:border-slate-700"
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
                {theme === 'light' ? (
                    <Moon className="w-5 h-5 transition-transform duration-500 hover:rotate-12" />
                ) : (
                    <Sun className="w-5 h-5 transition-transform duration-500 hover:rotate-90" />
                )}
            </button>

            {/* Language Dropdown */}
            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-2.5 px-3 py-2 bg-transparent rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 group cursor-pointer"
                >
                    <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                        <span className="text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                            {currentLang.name}
                        </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsOpen(false)}
                        />
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-zinc-100 dark:border-slate-800 rounded-2xl shadow-xl py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 ring-1 ring-zinc-100 dark:ring-slate-800 z-20">
                            <div className="px-4 py-2 mb-1 border-b border-zinc-50 dark:border-slate-800">
                                <span className="text-[10px] font-bold text-zinc-400 dark:text-slate-500 uppercase tracking-widest">Select Language</span>
                            </div>
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageChange(lang.code)}
                                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-all hover:bg-zinc-50 dark:hover:bg-slate-800 ${currentLang.code === lang.code
                                        ? 'text-[#2D5CFE] dark:text-blue-400 font-bold bg-blue-50/30 dark:bg-blue-900/20'
                                        : 'text-zinc-600 dark:text-slate-400 font-medium'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg leading-none">{lang.flag}</span>
                                        <span>{lang.name}</span>
                                    </div>
                                    {currentLang.code === lang.code && (
                                        <Check className="w-4 h-4" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
