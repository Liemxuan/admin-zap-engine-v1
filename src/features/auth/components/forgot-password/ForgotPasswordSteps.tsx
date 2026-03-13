import React from 'react';
import { useLanguage } from '../../../../shared/contexts/LanguageContext';
import { CheckCircle2, ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForgotPassword } from '../../hooks/useForgotPassword';

export const ForgotPasswordSteps: React.FC = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    
    const {
        step,
        setStep,
        email,
        otp,
        setOtp,
        password,
        confirmPassword,
        isLoading,
        error,
        isEmailSent,
        handleSendEmail,
        handleResendOtp,
        handleVerifyOtp,
        handleResetPassword,
        refs
    } = useForgotPassword();

    const [timer, setTimer] = React.useState(120); // 2 minutes

    React.useEffect(() => {
        let interval: any;
        if (step === 'verify-otp' && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const onResend = () => {
        if (timer === 0) {
            handleResendOtp();
            setTimer(120);
        }
    };

    const getStepContent = () => {
        switch (step) {
            case 'enter-email':
                return {
                    title: t('auth.forgotPassword.title'),
                    subtitle: t('auth.forgotPassword.subtitle')
                };
            case 'verify-otp':
                return {
                    title: t('auth.register.verify_title'),
                    subtitle: t('auth.register.verify_subtitle')
                };
            case 'reset-password':
                return {
                    title: t('auth.resetPassword.title'),
                    subtitle: t('auth.resetPassword.subtitle')
                };
            default:
                return { title: '', subtitle: '' };
        }
    };

    const content = getStepContent();

    const TitleSection = () => (
        <div className="mb-10 text-left">
            <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
                {content.title}
            </h2>
            <p className="text-slate-500 text-base font-medium">
                {content.subtitle}
            </p>
        </div>
    );

    // Step 1: Enter Email
    if (step === 'enter-email') {
        return (
            <div className="animate-in fade-in duration-500">
                <TitleSection />
                <div className="space-y-6">
                    <div className="space-y-1">
                        <zap-input
                            ref={refs.emailRef}
                            label={t('auth.forgotPassword.email')}
                            type="text"
                            placeholder="kien.phan@zap.vn"
                            value={email}
                            icon-start="user"
                            fullwidth
                        ></zap-input>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-xl border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="pt-2">
                        <zap-button
                            label={t('auth.forgotPassword.submit')}
                            variant="contained"
                            size="large"
                            fullwidth
                            onClick={handleSendEmail}
                            disabled={isLoading}
                            style-override="background: #2b7fff; border-radius: 0.75rem; font-weight: 700; height: 3.5rem; font-size: 1rem;"
                        ></zap-button>
                    </div>

                    <div className="text-center pt-2">
                        <button
                            onClick={() => navigate(`/${language}/login`)}
                            className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center gap-2 mx-auto"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {t('auth.forgotPassword.backToLogin')}
                        </button>
                    </div>

                    {isEmailSent && (
                        <div className="bg-green-50 border border-green-100 p-4 rounded-xl flex gap-3 animate-in fade-in slide-in-from-bottom-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <p className="text-sm text-green-700 font-medium">
                                {t('auth.forgotPassword.success_message')}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Step 2: Verify OTP
    if (step === 'verify-otp') {
        return (
            <div className="animate-in fade-in duration-500">
                <TitleSection />
                <div className="space-y-8">
                    <div className="flex justify-between items-center gap-2">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                            <input
                                key={i}
                                type="text"
                                maxLength={1}
                                className="w-12 h-14 text-center text-2xl font-black border-2 border-slate-100 rounded-xl focus:border-blue-500 focus:outline-none transition-all bg-slate-50/50"
                                onInput={(e: any) => {
                                    const val = (e.target as HTMLInputElement).value;
                                    if (val && i < 5) {
                                        ((e.target as HTMLInputElement).nextElementSibling as HTMLInputElement)?.focus();
                                    }
                                    const newOtp = otp.split('');
                                    newOtp[i] = val;
                                    setOtp(newOtp.join(''));
                                }}
                                onKeyDown={(e: any) => {
                                    if (e.key === 'Backspace' && !(e.target as HTMLInputElement).value && i > 0) {
                                        ((e.target as HTMLInputElement).previousElementSibling as HTMLInputElement)?.focus();
                                    }
                                }}
                            />
                        ))}
                    </div>

                    <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-slate-400">{t('auth.register.notReceiveCode')}</span>
                        <button 
                            onClick={onResend}
                            disabled={timer > 0 || isLoading}
                            className={`transition-colors ${timer > 0 ? 'text-slate-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-700'}`}
                        >
                            {t('auth.register.resendCode')} {timer > 0 && `(${formatTime(timer)})`}
                        </button>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-xl border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="pt-2">
                        <zap-button
                            label={t('auth.register.confirm')}
                            variant="contained"
                            size="large"
                            fullwidth
                            onClick={handleVerifyOtp}
                            disabled={isLoading || otp.length < 6}
                            style-override="background: #2b7fff; border-radius: 0.75rem; font-weight: 700; height: 3.5rem; font-size: 1rem;"
                        ></zap-button>
                    </div>

                    <div className="text-center">
                        <button
                            onClick={() => setStep('enter-email')}
                            className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center gap-2 mx-auto"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {t('auth.register.back')}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Step 3: Reset Password
    if (step === 'reset-password') {
        return (
            <div className="animate-in fade-in duration-500">
                <TitleSection />
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <zap-input
                                ref={refs.passwordRef}
                                label={t('auth.register.password')}
                                type="password"
                                placeholder={t('auth.register.passwordPlaceholder')}
                                value={password}
                                icon-start="lock"
                                fullwidth
                            ></zap-input>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold">
                                <span className="text-slate-500">{t('auth.register.securityLevel')}</span>
                                <span className="text-orange-500">{t('auth.register.pwdAverage')}</span>
                            </div>
                            <div className="flex gap-1 h-1">
                                <div className="flex-1 bg-blue-500 rounded-full"></div>
                                <div className="flex-1 bg-blue-500 rounded-full"></div>
                                <div className="flex-1 bg-blue-500 rounded-full"></div>
                                <div className="flex-1 bg-slate-100 rounded-full"></div>
                                <div className="flex-1 bg-slate-100 rounded-full"></div>
                            </div>
                            <p className="text-[10px] text-slate-400 font-medium">
                                {t('auth.register.pwdHint')}
                            </p>
                        </div>

                        <div className="relative">
                            <zap-input
                                ref={refs.confirmRef}
                                label={t('auth.register.confirmPassword')}
                                type="password"
                                placeholder={t('auth.register.passwordPlaceholder')}
                                value={confirmPassword}
                                icon-start="lock"
                                fullwidth
                            ></zap-input>
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-xl border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="pt-2">
                        <zap-button
                            label={t('auth.resetPassword.submit')}
                            variant="contained"
                            size="large"
                            fullwidth
                            onClick={handleResetPassword}
                            disabled={isLoading}
                            style-override="background: #2b7fff; border-radius: 0.75rem; font-weight: 700; height: 3.5rem; font-size: 1rem;"
                        ></zap-button>
                    </div>

                    <div className="text-center pt-2">
                        <button
                            onClick={() => navigate(`/${language}/login`)}
                            className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center gap-2 mx-auto"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {t('auth.forgotPassword.backToLogin')}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Step 4: Success
    return (
        <div className="text-center space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-center">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center border-4 border-white shadow-xl shadow-green-500/10">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
            </div>
            
            <div className="space-y-3">
                <h3 className="text-2xl font-black text-slate-900 leading-tight">
                    {t('auth.resetPassword.success_title')}
                </h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-[320px] mx-auto">
                    {t('auth.resetPassword.success_message')}
                </p>
            </div>

            <div className="space-y-4 pt-4">
                <zap-button
                    label={t('auth.forgotPassword.backToLogin')}
                    variant="contained"
                    size="large"
                    fullwidth
                    onClick={() => navigate(`/${language}/login`)}
                    style-override="background: #2b7fff; border-radius: 0.75rem; font-weight: 700; height: 3.5rem; font-size: 1rem;"
                ></zap-button>
                
                <button className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
                    {t('footer.help')}
                </button>
            </div>
        </div>
    );
};
