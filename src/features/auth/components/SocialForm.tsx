import React from 'react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { useTheme } from '../../../shared/contexts/ThemeContext';

export const SocialForm: React.FC = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();

    return (
        <div className="grid grid-cols-2 gap-4 mb-8">
            <zap-button
                variant="outlined"
                size="medium"
                style-override={`width: 100%; border-radius: 0.75rem; border-color: ${theme === 'dark' ? '#334155' : '#E2E8F0'}; color: ${theme === 'dark' ? '#CBD5E1' : '#334155'}; font-weight: 500;`}
            >
                <div className="flex items-center justify-center gap-2">
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        className="w-5 h-5 object-contain"
                        alt="Google"
                    />
                    <span className="text-sm">{t('auth.social_google')}</span>
                </div>
            </zap-button>

            <zap-button
                variant="outlined"
                size="medium"
                style-override={`width: 100%; border-radius: 0.75rem; border-color: ${theme === 'dark' ? '#334155' : '#E2E8F0'}; color: ${theme === 'dark' ? '#CBD5E1' : '#334155'}; font-weight: 500;`}
            >
                <div className="flex items-center justify-center gap-2">
                    <img
                        src={theme === 'dark' 
                            ? "https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg" 
                            : "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"}
                        className="w-5 h-5 object-contain"
                        alt="Apple"
                    />
                    <span className="text-sm">{t('auth.social_apple')}</span>
                </div>
            </zap-button>
        </div>
    );
};
