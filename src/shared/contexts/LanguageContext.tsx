import React, { createContext, useContext, useState, type ReactNode } from 'react';

import { translations, type Language, type TranslationKeys } from '../locales';
import { STORAGE_KEYS } from '../constants';

interface LanguageContextType {
    language: Language;
    isChangingLanguage: boolean;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
        return (saved === 'vi' || saved === 'en') ? saved as Language : 'vi';
    });
    const [isChangingLanguage, setIsChangingLanguage] = useState(false);

    const setLanguage = (lang: Language) => {
        if (lang === language) return;
        
        setIsChangingLanguage(true);
        // Delay 2s to create a smooth transition as requested
        setTimeout(() => {
            setLanguageState(lang);
            localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
            setIsChangingLanguage(false);
        }, 2000); // Using 2000ms as requested by the user.
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
        <LanguageContext.Provider value={{ language, isChangingLanguage, setLanguage, t }}>
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
