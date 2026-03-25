import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import type { RegisterRequest, ActivateRequest } from '../types/auth.types';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

/**
 * Hook xử lý logic API Đăng ký (Register)
 */
export const useRegister = () => {
    const navigate = useNavigate();
    const { language } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (data: RegisterRequest) => {
        setIsLoading(true);
        setError(null);
        try {
            await authService.register(data);
            // Nếu IsVerify hoặc VerifyEmail là true (đã xác thực ở step 2), chuyển thẳng tới login bước 2
            // Ngược lại, chuyển tới trang kích hoạt để nhận mã OTP qua email
            if (data.IsVerify || data.VerifyEmail) {
                navigate(`/${language}/login?activated=true&email=${encodeURIComponent(data.Email)}&step=2&m=${encodeURIComponent(data.MerchantName)}`);
            } else {
                navigate(`/${language}/active-account?email=${encodeURIComponent(data.Email)}&m=${encodeURIComponent(data.MerchantName)}`);
            }
        } catch (err: any) {
            const data = err.response?.data;
            setError(data?.detail || data?.Detail || data?.message || data?.Message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    return { register, isLoading, error };
};

/**
 * Hook xử lý logic Kích hoạt tài khoản (Active Account)
 */
export const useActiveAccount = () => {
    const navigate = useNavigate();
    const { language } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const activate = async (data: ActivateRequest, merchantName?: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.activate(data);
            if (response.success || response.Success) {
                // Kích hoạt thành công, chuyển về trang đăng nhập
                const mParam = merchantName ? `&m=${merchantName}` : '';
                navigate(`/${language}/login?activated=true&email=${data.Email}${mParam}`);
            } else {
                setError(response.message || response.Message || response.detail || response.Detail || 'Kích hoạt không thành công. Vui lòng thử lại.');
            }
        } catch (err: any) {
            const data = err.response?.data;
            setError(data?.detail || data?.Detail || data?.message || data?.Message || 'Mã OTP không hợp lệ hoặc đã hết hạn.');
        } finally {
            setIsLoading(false);
        }
    };

    const resend = async (email: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.resendOtp(email);
            if (response.success || response.Success) {
                return { success: true, message: response.message || response.Message };
            } else {
                setError(response.message || response.Message || response.detail || response.Detail || 'Gửi lại mã thất bại.');
                return { success: false };
            }
        } catch (err: any) {
            const data = err.response?.data;
            setError(data?.detail || data?.Detail || data?.message || data?.Message || 'Đã xảy ra lỗi khi gửi lại mã.');
            return { success: false };
        } finally {
            setIsLoading(false);
        }
    };

    return { activate, resend, isLoading, error };
};

/**
 * Hook xử lý logic riêng cho Giao diện Register Form (State & Events)
 */
export const useRegisterForm = () => {
    const { t } = useLanguage();
    const { register, isLoading, error: apiError } = useRegister();
    const [localError, setLocalError] = useState<string | null>(null);

    const merchantRef = useRef<any>(null);
    const emailRef = useRef<any>(null);
    const phoneRef = useRef<any>(null);
    const passwordRef = useRef<any>(null);
    const confirmRef = useRef<any>(null);

    const [formData, setFormData] = useState({
        MerchantName: '',
        Email: '',
        Phone: '',
        Password: '',
        ConfirmPass: '',
    });

    const handleInput = (name: string, value: string) => {
        if (name === 'MerchantName') {
            const sanitized = value.toLowerCase().replace(/[^a-z0-9-]/g, '');
            setFormData(prev => ({ ...prev, [name]: sanitized }));
            return;
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone: string) => {
        // Basic phone validation: at least 10 digits
        return /^(0|84|\+84)[3|5|7|8|9][0-9]{8}$/.test(phone);
    };

    const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
        if (e) e.preventDefault();
        setLocalError(null);

        if (!formData.MerchantName) {
            setLocalError(t('auth.register_error_merchant_required') || 'Merchant name is required');
            merchantRef.current?.focus();
            return;
        }

        if (!validateEmail(formData.Email)) {
            setLocalError(t('auth.register_error_email_invalid') || 'Invalid email format');
            emailRef.current?.focus();
            return;
        }

        if (!validatePhone(formData.Phone)) {
            setLocalError(t('auth.register_error_phone_invalid') || 'Invalid phone number format');
            phoneRef.current?.focus();
            return;
        }

        if (formData.Password.length < 6) {
            setLocalError(t('auth.register_error_password_length') || 'Password must be at least 6 characters');
            passwordRef.current?.focus();
            return;
        }

        if (formData.Password !== formData.ConfirmPass) {
            setLocalError(t('auth.register_error_password_match') || 'Passwords do not match');
            confirmRef.current?.focus();
            return;
        }

        await register({
            MerchantName: formData.MerchantName,
            Email: formData.Email,
            Phone: formData.Phone,
            Password: formData.Password,
            Provider: 'Email'
        });
    };

    useEffect(() => {
        const onInput = (name: string) => (e: any) => {
            const val = e.detail?.value !== undefined ? e.detail.value : e.target.value;
            handleInput(name, val);
        };

        const onKeyDown = (e: any) => {
            if (e.key === 'Enter') handleSubmit();
        };

        const mRef = merchantRef.current;
        const eRef = emailRef.current;
        const phRef = phoneRef.current;
        const pRef = passwordRef.current;
        const cRef = confirmRef.current;

        mRef?.addEventListener('input', onInput('MerchantName'));
        eRef?.addEventListener('input', onInput('Email'));
        phRef?.addEventListener('input', onInput('Phone'));
        pRef?.addEventListener('input', onInput('Password'));
        cRef?.addEventListener('input', onInput('ConfirmPass'));

        [mRef, eRef, phRef, pRef, cRef].forEach(ref => ref?.addEventListener('keydown', onKeyDown));

        return () => {
            mRef?.removeEventListener('input', onInput('MerchantName'));
            eRef?.removeEventListener('input', onInput('Email'));
            phRef?.removeEventListener('input', onInput('Phone'));
            pRef?.removeEventListener('input', onInput('Password'));
            cRef?.removeEventListener('input', onInput('ConfirmPass'));
            [mRef, eRef, phRef, pRef, cRef].forEach(ref => ref?.removeEventListener('keydown', onKeyDown));
        };
    }, [formData]);

    const isValid = formData.MerchantName.trim() !== '' &&
        formData.Email.trim() !== '' &&
        formData.Phone.trim() !== '' &&
        formData.Password.trim() !== '' &&
        formData.ConfirmPass.trim() !== '';

    return {
        formData, isLoading, error: localError || apiError, handleSubmit, isValid,
        refs: { merchantRef, emailRef, phoneRef, passwordRef, confirmRef }
    };
};

/**
 * Hook xử lý logic riêng cho Giao diện Active Account Form (State & Events)
 */
export const useActiveAccountForm = (email: string, merchantName: string) => {
    const { activate, resend, isLoading, error } = useActiveAccount();
    const [otp, setOtp] = useState('');
    const otpRef = useRef<any>(null);

    // Dùng refs để tránh stale closure trong event listeners
    const otpRefValue = useRef(otp);
    const emailRefValue = useRef(email);
    const merchantNameRefValue = useRef(merchantName);

    useEffect(() => {
        otpRefValue.current = otp;
        emailRefValue.current = email;
        merchantNameRefValue.current = merchantName;
    }, [otp, email, merchantName]);

    const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
        if (e) e.preventDefault();
        const currentOtp = otpRefValue.current;
        if (currentOtp.length !== 6) return;

        await activate({
            Email: emailRefValue.current,
            Otp: currentOtp
        }, merchantNameRefValue.current);
    };

    const handleResend = async () => {
        const result = await resend(emailRefValue.current);
        if (result.success) {
            alert(result.message || 'Mã OTP đã được gửi lại');
        }
    };

    useEffect(() => {
        const onInput = (e: any) => {
            const val = e.detail?.value !== undefined ? e.detail.value : e.target.value;
            const digits = val.replace(/\D/g, '').slice(0, 6);
            setOtp(digits);
        };

        const onKeyDown = (e: any) => {
            if (e.key === 'Enter') handleSubmit();
        };

        const ref = otpRef.current;
        if (ref) {
            ref.addEventListener('input', onInput);
            ref.addEventListener('keydown', onKeyDown);
        }

        return () => {
            if (ref) {
                ref.removeEventListener('input', onInput);
                ref.removeEventListener('keydown', onKeyDown);
            }
        };
    }, []);

    return {
        otp,
        isLoading,
        error,
        handleSubmit,
        handleResend,
        refs: { otpRef }
    };
};
