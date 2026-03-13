import React, { createContext, useContext, useState, type ReactNode } from 'react';

import { translations, type Language, type TranslationKeys } from '../locales';
import { STORAGE_KEYS } from '../constants';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
        return (saved === 'vi' || saved === 'en') ? saved as Language : 'vi';
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    };

    const t = (key: string): string => {
        const keys = key.split('.');
        let result: any = translations[language];

        for (const k of keys) {
            if (result && typeof result === 'object' && k in result) {
                result = result[k];
            } else {
                return key;
            }
        }

        return typeof result === 'string' ? result : key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
