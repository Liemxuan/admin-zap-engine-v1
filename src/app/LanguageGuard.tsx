import React, { useEffect } from 'react';
import { useParams, Outlet, Navigate } from 'react-router-dom';
import { useLanguage } from '../shared/contexts/LanguageContext';
import type { Language } from '../shared/locales';

/**
 * Syncs the URL's lang parameter with our LanguageProvider state.
 * If the language is not supported, it defaults to 'vi'.
 */
export const LanguageGuard: React.FC = () => {
    const { lang } = useParams<{ lang: string }>();
    const { language, setLanguage } = useLanguage();

    useEffect(() => {
        // Sync provider with URL if needed
        if (lang && (lang === 'vi' || lang === 'en') && lang !== language) {
            setLanguage(lang as Language);
        }
    }, [lang, language, setLanguage]);

    // Handle invalid or missing language code
    if (!lang || !['vi', 'en'].includes(lang)) {
        return <Navigate to="/vi/login" replace />;
    }

    return <Outlet />;
};
