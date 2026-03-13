import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../../shared/contexts/LanguageContext';
import { authService } from '../services/auth.service';

export type ForgotPasswordStep = 'enter-email' | 'verify-otp' | 'reset-password' | 'success';

export const useForgotPassword = () => {
    const { t } = useLanguage();
    const [step, setStep] = useState<ForgotPasswordStep>('enter-email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [resetToken, setResetToken] = useState<string | null>(null);
    const [confirmToken, setConfirmToken] = useState<string | null>(null);

    const emailRef = useRef<any>(null);
    const otpRefs = useRef<(any)[]>([]);
    const passwordRef = useRef<any>(null);
    const confirmRef = useRef<any>(null);

    const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

    // Manual Event Binding for Custom Elements compatibility
    useEffect(() => {
        const onEmailInput = (e: any) => {
            setEmail(e.detail?.value !== undefined ? e.detail.value : e.target.value);
        };
        const onPassInput = (e: any) => {
            setPassword(e.detail?.value !== undefined ? e.detail.value : e.target.value);
        };
        const onConfirmInput = (e: any) => {
            setConfirmPassword(e.detail?.value !== undefined ? e.detail.value : e.target.value);
        };

        const eRef = emailRef.current;
        const pRef = passwordRef.current;
        const cRef = confirmRef.current;

        eRef?.addEventListener('input', onEmailInput);
        pRef?.addEventListener('input', onPassInput);
        cRef?.addEventListener('input', onConfirmInput);

        return () => {
            eRef?.removeEventListener('input', onEmailInput);
            pRef?.removeEventListener('input', onPassInput);
            cRef?.removeEventListener('input', onConfirmInput);
        };
    }, [step]);

    const handleSendEmail = async () => {
        setError(null);
        if (!email) {
            setError(t('auth.forgotPassword.error_email_required'));
            emailRef.current?.focus();
            return;
        }
        if (!validateEmail(email)) {
            setError(t('auth.register.error_email_invalid'));
            emailRef.current?.focus();
            return;
        }

        setIsLoading(true);
        try {
            const response = await authService.forgotPassword(email);
            if (response.success || response.Success) {
                setIsEmailSent(true);
                if (response.ResetToken) {
                    setResetToken(response.ResetToken);
                }
                setStep('verify-otp');
            } else {
                setError(response.message || response.Message || response.detail || response.Detail || 'Failed');
            }
        } catch (err: any) {
            setError(err.response?.data?.detail || err.response?.data?.Message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setError(null);
        setIsLoading(true);
        try {
            const response = await authService.resendOtp(email);
            if (!response.success && !response.Success) {
                setError(response.message || response.Message || response.detail || response.Detail || 'Failed to resend');
            }
        } catch (err: any) {
            const data = err.response?.data;
            setError(data?.detail || data?.Detail || data?.message || data?.Message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setError(null);
        if (otp.length < 6) {
            setError(t('auth.register.error_otp_required'));
            return;
        }

        setIsLoading(true);
        try {
            const response = await authService.verifyOtp({
                ResetToken: resetToken || '',
                Otp: otp
            });
            
            if (response.success || response.Success) {
                if (response.ConfirmToken) {
                    setConfirmToken(response.ConfirmToken);
                }
                setStep('reset-password');
            } else {
                setError(response.message || response.Message || response.detail || response.Detail || 'OTP Verification failed');
            }
        } catch (err: any) {
            const data = err.response?.data;
            setError(data?.detail || data?.Detail || data?.message || data?.Message || 'OTP Verification failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async () => {
        setError(null);
        if (!password) {
            setError(t('auth.register.error_password_required'));
            passwordRef.current?.focus();
            return;
        }
        if (password !== confirmPassword) {
            setError(t('auth.register.error_password_match'));
            confirmRef.current?.focus();
            return;
        }

        setIsLoading(true);
        try {
            const response = await authService.resetPassword({
                ConfirmToken: confirmToken || '',
                NewPassword: password,
                ConfirmPassword: confirmPassword
            });
            if (response.success || response.Success) {
                setStep('success');
            } else {
                setError(response.message || response.Message || response.detail || response.Detail || 'Failed');
            }
        } catch (err: any) {
            const data = err.response?.data;
            setError(data?.detail || data?.Detail || data?.message || data?.Message || 'Reset failed');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        step,
        setStep,
        email,
        setEmail,
        otp,
        setOtp,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        isLoading,
        error,
        isEmailSent,
        handleSendEmail,
        handleResendOtp,
        handleVerifyOtp,
        handleResetPassword,
        refs: {
            emailRef,
            otpRefs,
            passwordRef,
            confirmRef
        }
    };
};
