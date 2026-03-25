import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const COUNTRY_CODES = [
    { code: 'VN', dial: '+84', flag: '🇻🇳', name: 'Việt Nam' },
    { code: 'US', dial: '+1',  flag: '🇺🇸', name: 'United States' },
    { code: 'GB', dial: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: 'SG', dial: '+65', flag: '🇸🇬', name: 'Singapore' },
    { code: 'TH', dial: '+66', flag: '🇹🇭', name: 'Thailand' },
    { code: 'JP', dial: '+81', flag: '🇯🇵', name: 'Japan' },
    { code: 'KR', dial: '+82', flag: '🇰🇷', name: 'South Korea' },
    { code: 'AU', dial: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: 'CN', dial: '+86', flag: '🇨🇳', name: 'China' },
];

interface Props {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    hasError?: boolean;
}

export const PhoneEmailInput: React.FC<Props> = ({ value, onChange, label, placeholder, hasError }) => {
    const [isPhone, setIsPhone] = useState(false);
    const [country, setCountry] = useState(COUNTRY_CODES[0]);
    const [showDropdown, setShowDropdown] = useState(false);
    const phoneRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Detect phone vs email on first char
    const handleChange = (val: string) => {
        if (!isPhone && /^\d/.test(val)) {
            setIsPhone(true);
        } else if (val === '') {
            setIsPhone(false);
        }
        onChange(val);
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const borderColor = hasError
        ? 'border-red-400 dark:border-red-500'
        : 'border-slate-200 dark:border-slate-700';

    if (!isPhone) {
        return (
            <div className="space-y-1.5">
                {label && (
                    <label className="text-[12px] font-bold text-slate-700 dark:text-slate-300 ml-1">{label}</label>
                )}
                <div className={`flex items-center w-full h-12 px-4 rounded-xl border ${borderColor} bg-white dark:bg-slate-900 transition-colors focus-within:border-blue-500 dark:focus-within:border-blue-500`}>
                    <svg className="w-4 h-4 text-slate-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <input
                        type="text"
                        value={value}
                        onChange={e => handleChange(e.target.value)}
                        placeholder={placeholder}
                        className="flex-1 bg-transparent outline-none text-sm text-slate-900 dark:text-white placeholder-slate-400 font-medium"
                        autoComplete="email"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-1.5">
            {label && (
                <label className="text-[12px] font-bold text-slate-700 dark:text-slate-300 ml-1">{label}</label>
            )}
            <div className={`flex items-center w-full h-12 rounded-xl border ${borderColor} bg-white dark:bg-slate-900 overflow-visible transition-colors focus-within:border-blue-500 dark:focus-within:border-blue-500 relative ${showDropdown ? 'z-50' : 'z-auto'}`}>
                {/* Country selector */}
                <div ref={dropdownRef} className="relative flex-shrink-0 h-full">
                    <button
                        type="button"
                        onClick={() => setShowDropdown(v => !v)}
                        className="flex items-center gap-1.5 px-3 h-full border-r border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-l-xl"
                    >
                        <span className="text-lg leading-none">{country.flag}</span>
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{country.dial}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {showDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                            {COUNTRY_CODES.map(c => (
                                <button
                                    key={c.code}
                                    type="button"
                                    onClick={() => { setCountry(c); setShowDropdown(false); phoneRef.current?.focus(); }}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${c.code === country.code ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-700 dark:text-slate-300'}`}
                                >
                                    <span className="text-lg leading-none">{c.flag}</span>
                                    <span className="flex-1 text-left">{c.name}</span>
                                    <span className="text-slate-400 text-xs font-mono">{c.dial}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Phone number input */}
                <input
                    ref={phoneRef}
                    type="tel"
                    value={value}
                    onChange={e => handleChange(e.target.value.replace(/\D/g, ''))}
                    placeholder="0912 345 678"
                    className="flex-1 px-3 h-full bg-transparent outline-none text-sm text-slate-900 dark:text-white placeholder-slate-400 font-medium"
                    autoComplete="tel"
                    autoFocus
                />
            </div>
        </div>
    );
};
