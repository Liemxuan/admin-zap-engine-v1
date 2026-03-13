import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
import { LanguageProvider } from './shared/contexts/LanguageContext';
import { ThemeProvider } from './shared/contexts/ThemeContext';

// Import ZAP Design System components
import './components/atoms/zap-button';
import './components/atoms/zap-input';
import './components/atoms/zap-checkbox';
import './components/atoms/zap-radio';
import './components/atoms/zap-switch';
import './components/atoms/zap-card';
import './components/atoms/zap-badge';
import './components/atoms/zap-alert';
import './components/atoms/zap-skeleton';
import './components/atoms/zap-tabs';
import './components/atoms/zap-accordion';
import './components/molecules/zap-dialog';

import { createIcons, Layout, User, Lock, Eye, EyeOff, Globe, LogOut, Check, X, Building2, Mail, Phone, ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, Search, Plus, Trash2, Edit, MoreHorizontal, SlidersHorizontal } from 'lucide';

// Re-initialize Lucide icons
const icons = {
    Layout,
    User,
    Lock,
    Eye,
    EyeOff,
    Globe,
    LogOut,
    Check,
    X,
    Building2,
    Mail,
    Phone,
    ArrowLeft,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Search,
    Plus,
    Trash2,
    Edit,
    MoreHorizontal,
    SlidersHorizontal
};

createIcons({
    icons
});

// Polyfill lucide into window for shadow DOM registration
(window as any).lucide = {
    createIcons: (options: any) => {
        createIcons({
            icons,
            ...options
        });
    }
};

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <ThemeProvider>
                <LanguageProvider>
                    <App />
                </LanguageProvider>
            </ThemeProvider>
        </React.StrictMode>
    );
    console.log('React APP mounted successfully');
} else {
    console.error('Failed to find the root element to mount the app.');
}
