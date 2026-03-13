import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../../../shared/contexts/LanguageContext';
import { Lock } from 'lucide-react';
import { useLogin } from '../../hooks/useLogin';
import { STORAGE_KEYS } from '../../../../shared/constants';

interface Props {
    email: string;
    onBack: () => void;
    onSwitchToPassword: () => void;
}

export const LoginFormStepOtp: React.FC<Props> = ({ email, onBack, onSwitchToPassword }) => {
    const { t } = useLanguage();
    const { login, isLoading: isLoginLoading, error: loginError } = useLogin();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(119); // 01:59
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isRemember, setIsRemember] = useState(() => {
        return localStorage.getItem(STORAGE_KEYS.IS_REMEMBER) !== 'false';
    });
    const otpRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleOtpChange = (index: number, value: string) => {
        if (!/^[0-9]*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value !== '' && index < 5) {
            otpRefs[index + 1].current?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            otpRefs[index - 1].current?.focus();
        }
    };

    const handleResend = async () => {
        if (timer > 0) return;
        setIsLoading(true);
        setError(null);
        try {
            // Usually we'd use a specific resend-otp or similar
            // Assuming the authService has a resendOtp method
            const { authService } = await import('../../services/auth.service');
            await authService.resendOtp(email);
            setTimer(119);
        } catch (err: any) {
            setError(err.response?.data?.detail || "Failed to resend OTP");
        } finally {
            setIsLoading(false);
        }
    };

    const handleContinue = async () => {
        const otpCode = otp.join('');
        if (otpCode.length < 6) {
            setError(t('auth.register.error_otp_required'));
            return;
        }
        
        setError(null);
        await login({
            Email: email,
            Password: '',
            IsRemember: isRemember,
            Otp: otpCode
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Display and Change Account */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('auth.register.contact')}</label>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl flex items-center justify-between border border-slate-100 dark:border-slate-800">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 truncate max-w-[220px]">{email}</span>
                    <button
                        type="button"
                        onClick={onBack}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700"
                    >
                        {t('auth.login.change')}
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium">
                    {t('auth.register.otpInstruction1')} {email}
                </p>

                <div className="flex justify-between gap-2 md:gap-3">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={otpRefs[index]}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            className="w-full h-12 md:h-14 border border-slate-200 dark:border-slate-800 bg-transparent rounded-xl text-center text-xl font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all"
                        />
                    ))}
                </div>

                <div className="flex justify-between text-[13px] items-center font-bold">
                    <span className="text-slate-500 dark:text-slate-400">{t('auth.register.notReceiveCode')}</span>
                    <button 
                        onClick={handleResend}
                        disabled={timer > 0 || isLoading}
                        className={`transition-colors ${timer > 0 ? 'text-slate-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-700'}`}
                    >
                        {t('auth.register.resendCode')} {timer > 0 && `(${formatTime(timer)})`}
                    </button>
                </div>

                <div className="pt-2">
                    <zap-checkbox
                        label={t('auth.login.remember')}
                        checked={isRemember}
                        onInput={(e: any) => setIsRemember(e.detail.checked)}
                    ></zap-checkbox>
                </div>
            </div>

            {(error || loginError) && (
                <div className="text-red-500 dark:text-red-400 text-xs font-semibold bg-red-50 dark:bg-red-950/20 p-3 rounded-xl border border-red-100 dark:border-red-900/30">
                    {error || loginError}
                </div>
            )}

            <zap-button
                label={isLoginLoading ? t('auth.register.continue') + "..." : t('auth.register.continue')}
                variant="contained"
                size="large"
                fullwidth
                onClick={handleContinue}
                disabled={isLoading || isLoginLoading || otp.join('').length < 6}
                loading={isLoginLoading ? "" : undefined}
                style-override="background: #2b7fff; border-radius: 0.75rem; font-weight: 700; height: 3.5rem; font-size: 1rem;"
            ></zap-button>

            <zap-button
                variant="outlined"
                size="large"
                fullwidth
                onClick={onSwitchToPassword}
                style-override="width: 100%; border-radius: 0.75rem; font-weight: 700; height: 3.5rem;"
            >
                <div className="flex items-center justify-center gap-2 text-slate-700 dark:text-slate-300">
                    <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>{t('auth.login.password_login') || "Đăng nhập bằng mật khẩu"}</span>
                </div>
            </zap-button>
        </div>
    );
};
