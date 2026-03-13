import React, { useState, useRef } from 'react';
import { useLanguage } from '../../../../shared/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../../hooks/useRegister';
import { authService } from '../../services/auth.service';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export const SignUpForm: React.FC = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    // Form States
    const [contact, setContact] = useState(''); // Email or Phone (Step 1)
    const [otp, setOtp] = useState(['', '', '', '', '', '']); // OTP 6 digits (Step 2)
    const [timer, setTimer] = useState(119); // Countdown for OTP
    const [isResending, setIsResending] = useState(false);
    const [showAccountExistsModal, setShowAccountExistsModal] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [merchantName, setMerchantName] = useState('');
    const [merchantUrl, setMerchantUrl] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [isEmailContact, setIsEmailContact] = useState(false);
    const [isCheckingAccount, setIsCheckingAccount] = useState(false);
    const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

    const [localError, setLocalError] = useState<string | null>(null);

    const { register, isLoading, error: apiError } = useRegister();

    const otpRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

    React.useEffect(() => {
        let interval: any;
        if (step === 2 && timer > 0) {
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

    const slugify = (text: string) => {
        return text
            .toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    };

    const handleMerchantNameChange = (val: string) => {
        setMerchantName(val);
        setLocalError(null);
        setMerchantUrl(slugify(val));
    };

    const validateStep1 = () => {
        setLocalError(null);
        const trimmedContact = contact.trim();
        if (!trimmedContact) {
            setLocalError(t('auth.register.error_email_invalid') || "Vui lòng nhập email hoặc số điện thoại.");
            return false;
        }

        const isPhoneContact = /^0\d{9}$/.test(trimmedContact);
        const isEmailInput = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedContact);

        if (!isPhoneContact && !isEmailInput) {
            setLocalError(t('auth.register.error_email_invalid') || "Email hoặc số điện thoại không hợp lệ.");
            return false;
        }

        if (!agreeTerms) {
            setLocalError(t('auth.register.error_terms_required') || "Bạn phải đồng ý với điều khoản dịch vụ và chính sách bảo mật.");
            return false;
        }

        setIsEmailContact(isEmailInput);
        return true;
    };

    const validateStep2 = () => {
        setLocalError(null);
        const otpString = otp.join('');
        if (otpString.length < 6) {
            setLocalError(t('auth.register.error_otp_required') || "Vui lòng nhập đầy đủ mã OTP 6 số."); // Usually OTP step happens after registration or backend integration
            return false;
        }

        return true;
    };

    const validateStep3 = () => {
        setLocalError(null);
        const hasUpper = /[A-Z]/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        if (password.length < 8 || !hasUpper || !hasSpecial) {
            setLocalError(t('auth.register.error_password_length') || "Mật khẩu phải từ 8 ký tự, bao gồm chữ hoa và ký tự đặc biệt.");
            return false;
        }
        if (password !== confirmPassword) {
            setLocalError(t('auth.register.error_password_match') || "Xác nhận mật khẩu không khớp.");
            return false;
        }
        return true;
    };

    const validateStep4 = () => {
        setLocalError(null);
        if (!firstName.trim()) {
            setLocalError(t('auth.register.error_firstName_required') || "Vui lòng nhập họ.");
            return false;
        }
        if (!lastName.trim()) {
            setLocalError(t('auth.register.error_lastName_required') || "Vui lòng nhập tên.");
            return false;
        }
        if (!merchantName.trim()) {
            setLocalError(t('auth.register.error_merchant_required') || "Vui lòng nhập tên doanh nghiệp.");
            return false;
        }
        if (isEmailContact) {
            if (!/^0\d{9}$/.test(phone.trim())) {
                setLocalError(t('auth.register.error_phone_invalid') || "Vui lòng nhập số điện thoại.");
                return false;
            }
        } else {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
                setLocalError(t('auth.register.error_email_invalid') || "Vui lòng nhập email hợp lệ.");
                return false;
            }
        }
        return true;
    };

    const handleNext = async (currentStep: number) => {
        setLocalError(null);
        if (currentStep === 1 && validateStep1()) {
            setIsCheckingAccount(true);
            try {
                // Determine the correct email parameter value (The prompt example payload is {"Email": "hxliem24101@gmail.com"})
                // Therefore we always send the contact data as "Email" to the backend regardless if it is phone or email
                const res = await authService.checkAccount({ Email: contact.trim() });
                if (res.Success || res.success) {
                    setTimer(119);
                    setStep(2);
                }
            } catch (err: any) {
                const data = err.response?.data;
                const errCode = data?.errorCode || data?.ErrorCode;
                if (errCode === 'error_duplicate_account' || (err.response?.status === 500 && data?.Message === "Account already exists")) {
                    setShowAccountExistsModal(true);
                } else if (errCode === 'error_duplicate_account' || data?.Message === "error_account_found") {
                    // This is for the check-account API case where it returns success:true if login:true and account found
                    // But usually it returns 400 or something if we check for registration
                    setShowAccountExistsModal(true);
                } else {
                    setLocalError(data?.detail || data?.Detail || data?.message || data?.Message || t('auth.register.error_duplicate_account') || "Email/Số điện thoại này đã được sử dụng. Vui lòng chọn tài khoản khác.");
                }
            } finally {
                setIsCheckingAccount(false);
            }
        }
        if (currentStep === 2 && validateStep2()) {
            setIsVerifyingOtp(true);
            try {
                const res = await authService.verifyRegistrationOtp({
                    Email: contact.trim(),
                    Otp: otp.join('')
                });
                if (res.Success || res.success) {
                    setStep(3);
                }
            } catch (err: any) {
                const data = err.response?.data;
                const errCode = data?.errorCode || data?.ErrorCode;
                if (errCode === 'error_invalid_otp') {
                    setLocalError(data?.detail || data?.Detail || t('auth.register.error_otp_invalid') || "Mã xác thực không chính xác.");
                } else {
                    setLocalError(data?.detail || data?.Detail || data?.message || data?.Message || "Đã có lỗi xảy ra");
                }
            } finally {
                setIsVerifyingOtp(false);
            }
        }
        if (currentStep === 3 && validateStep3()) setStep(4);
    };

    const handleResend = async () => {
        if (timer > 0 || isResending) return;
        setIsResending(true);
        setLocalError(null);
        try {
            await authService.resendOtp(contact.trim());
            setTimer(119);
        } catch (err: any) {
            setLocalError(err.response?.data?.detail || "Gửi lại mã thất bại");
        } finally {
            setIsResending(false);
        }
    };

    const handleFinish = async () => {
        setLocalError(null);
        if (!validateStep4()) return;
        if (!merchantUrl.trim()) {
            setLocalError(t('auth.register.error_merchant_url_required') || "Vui lòng nhập URL doanh nghiệp.");
            return;
        }
        try {
            // Mapping UI fields to actual RegisterRequest
            await register({
                MerchantName: merchantUrl.trim(), // Using URL as the unique identifier/tenant ID
                Email: isEmailContact ? contact : email,
                Phone: isEmailContact ? phone : contact,
                Password: password,
                Provider: 'Email',
                FirstName: firstName.trim(),
                LastName: lastName.trim(),
                VerifyEmail: isEmailContact,
                IsVerify: isEmailContact
            });
            // if success the hook will navigate
        } catch (err) {
            // Error managed by useRegister
        }
    };

    const currentError = localError || apiError;

    // Helper to evaluate password strength visually
    const getPwdStrength = () => {
        if (!password) return { val: 0, text: '', color: 'bg-slate-200' };
        const hasUpper = /[A-Z]/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        if (password.length < 8 || !hasUpper || !hasSpecial) {
            return { val: 1, text: t('auth.register.pwdWeak') || 'Yếu', color: 'bg-red-500', textClass: 'text-red-500' };
        }
        if (hasNumber && password.length >= 10) {
            return { val: 3, text: t('auth.register.pwdStrong') || 'Mạnh', color: 'bg-green-500', textClass: 'text-green-500' };
        }
        return { val: 2, text: t('auth.register.pwdAverage') || 'Trung bình', color: 'bg-orange-500', textClass: 'text-orange-500' };
    };

    const pwdStrength = getPwdStrength();

    return (
        <div className="w-full h-full flex flex-col justify-center max-w-[440px] mx-auto animate-in fade-in duration-500 relative">

            {/* Common Error Display */}
            {currentError && (
                <div className="absolute -top-16 left-0 right-0 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm font-medium bg-red-50/80 dark:bg-red-950/20 p-3 rounded-lg border border-red-100 dark:border-red-900/30 animate-in zoom-in-95 duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>{currentError}</span>
                </div>
            )}

            {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="mb-8">
                        <h2 className="text-[28px] font-bold text-slate-900 dark:text-white mb-2 tracking-tight">{t('auth.register.title')}</h2>
                        <p className="text-[15px] font-medium text-slate-500 dark:text-slate-400">{t('auth.register.subtitle')}</p>
                    </div>

                    <div className="space-y-6">
                        <zap-input
                            label={t('auth.register.contact')}
                            placeholder={t('auth.register.contactPlaceholder')}
                            icon-end="user"
                            value={contact}
                            fullwidth
                            onInput={(e: any) => { setContact(e.detail?.value || e.target.value); setLocalError(null); }}
                        ></zap-input>
                        
                        <div className="flex gap-3 items-start py-1">
                            <input
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={(e) => { setAgreeTerms(e.target.checked); setLocalError(null); }}
                                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#1d4ed8] focus:ring-[#1d4ed8] cursor-pointer"
                            />
                            <p className="text-[13px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed font-sans">
                                {t('auth.register.agree1')} <span className="text-[#1d4ed8] dark:text-blue-400 font-bold cursor-pointer hover:underline">{t('auth.register.agreeTerms')}</span> {' '}
                                {t('auth.register.agree2')} <span className="text-[#1d4ed8] dark:text-blue-400 font-bold cursor-pointer hover:underline">{t('auth.register.agreePolicy')}</span>.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => handleNext(1)}
                            disabled={isCheckingAccount || !contact.trim() || !agreeTerms}
                            className={`w-full flex items-center justify-center gap-2 bg-[#1d4ed8] hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg h-12 transition-colors shadow-sm ${(isCheckingAccount || !contact.trim() || !agreeTerms) ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                            {isCheckingAccount ? `${t('auth.register.continue')}...` : t('auth.register.continue')} {!isCheckingAccount && <ArrowRight className="w-4 h-4 ml-1" />}
                        </button>

                        <div className="relative my-8 flex items-center">
                            <div className="flex-grow border-t border-slate-200/60 dark:border-slate-800"></div>
                            <span className="flex-shrink-0 px-4 text-[13px] font-medium text-slate-400 dark:text-slate-500">{t('auth.register.orRegisterWith')}</span>
                            <div className="flex-grow border-t border-slate-200/60 dark:border-slate-800"></div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <button className="flex h-12 items-center justify-center border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" alt="Google" />
                            </button>
                            <button className="flex h-12 items-center justify-center border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" className="w-6 h-6" alt="Facebook" />
                            </button>
                            <button className="flex h-12 items-center justify-center border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" className="w-[20px] h-[20px] dark:invert" alt="Apple" />
                            </button>
                        </div>

                        <div className="text-center mt-10">
                            <p className="text-[14px] text-slate-500 dark:text-slate-400 font-medium">
                                {t('auth.signin.signin_prompt')}{' '}
                                <a href={`/${language}/login`} onClick={(e) => { e.preventDefault(); navigate(`/${language}/login`); }} className="text-[#1d4ed8] dark:text-blue-400 font-bold hover:underline">
                                    {t('auth.signin.signin')}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="mb-8">
                        <h2 className="text-[28px] font-bold text-slate-900 dark:text-white mb-2 tracking-tight">{t('auth.register.authTitle')}</h2>
                        <p className="text-[15px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                            {t('auth.register.otpInstruction1')} <span className="text-slate-700 dark:text-slate-300 font-semibold">{contact}</span> {t('auth.register.otpInstruction2')}
                        </p>
                    </div>

                    <div className="flex justify-between gap-3 mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={otpRefs[index]}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                className="w-[52px] h-[52px] md:w-[60px] md:h-[60px] border border-slate-200 dark:border-slate-800 bg-transparent rounded-xl text-center text-xl font-bold text-slate-900 dark:text-white focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8] focus:outline-none transition-all"
                            />
                        ))}
                    </div>

                    <div className="flex justify-between text-[13px] mb-8 items-center font-medium">
                        <span className="text-slate-500 dark:text-slate-400">{t('auth.register.notReceiveCode')}</span>
                        <button 
                            onClick={handleResend}
                            disabled={timer > 0 || isResending}
                            className={`font-semibold transition-colors ${timer > 0 || isResending ? 'text-slate-400 cursor-not-allowed' : 'text-[#1d4ed8] hover:text-blue-800'}`}
                        >
                            {t('auth.register.resendCode')} {timer > 0 && `(${formatTime(timer)})`}
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => handleNext(2)}
                        disabled={isVerifyingOtp || otp.join('').length < 6}
                        className={`w-full flex items-center justify-center bg-[#1d4ed8] hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg h-12 transition-colors shadow-sm mb-6 ${(isVerifyingOtp || otp.join('').length < 6) ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                        {isVerifyingOtp ? `${t('auth.register.confirm')}...` : t('auth.register.confirm')}
                    </button>

                    <button
                        type="button"
                        onClick={() => { setStep(1); setLocalError(null); }}
                        className="flex items-center text-[13px] font-bold text-[#1d4ed8] hover:text-blue-800 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1.5" />
                        {t('auth.register.backToRegister')}
                    </button>
                </div>
            )}

            {step === 3 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="mb-8">
                        <h2 className="text-[28px] font-bold text-slate-900 dark:text-white mb-2 tracking-tight">{t('auth.register.title')}</h2>
                        <p className="text-[15px] font-medium text-slate-500 dark:text-slate-400">{t('auth.register.setPassword')}</p>
                    </div>

                    <div className="space-y-6">
                        <div className="relative">
                            <zap-input
                                label={t('auth.register.password')}
                                type="password"
                                placeholder={t('auth.register.passwordPlaceholder')}
                                icon-end="eye"
                                value={password}
                                onInput={(e: any) => { setPassword(e.detail?.value || e.target.value); setLocalError(null); }}
                                fullwidth
                            ></zap-input>
                        </div>

                        <div className="-mt-3 mb-2 px-1">
                            <div className="flex justify-between items-center mb-1.5 opacity-90">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('auth.register.securityLevel')}</span>
                                <span className={`text-[11px] font-bold ${pwdStrength.textClass}`}>{pwdStrength.text}</span>
                            </div>
                            <div className="flex gap-1.5 w-full h-[3px]">
                                <div className={`rounded-full flex-1 ${pwdStrength.val >= 1 ? pwdStrength.color : 'bg-slate-200'}`}></div>
                                <div className={`rounded-full flex-1 ${pwdStrength.val >= 2 ? pwdStrength.color : 'bg-slate-200'}`}></div>
                                <div className={`rounded-full flex-1 ${pwdStrength.val >= 3 ? pwdStrength.color : 'bg-slate-200'}`}></div>
                            </div>
                            <p className="text-[11px] text-slate-400 font-medium mt-2 leading-relaxed">
                                {t('auth.register.pwdHint')}
                            </p>
                        </div>

                        <zap-input
                            label={t('auth.register.confirmPassword')}
                            type="password"
                            placeholder={t('auth.register.confirmPlaceholder')}
                            icon-end="eye"
                            value={confirmPassword}
                            onInput={(e: any) => { setConfirmPassword(e.detail?.value || e.target.value); setLocalError(null); }}
                            fullwidth
                        ></zap-input>


                        <button
                            type="button"
                            onClick={() => handleNext(3)}
                            disabled={!password.trim() || !confirmPassword.trim()}
                            className={`w-full flex items-center justify-center bg-[#1d4ed8] hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg h-12 transition-colors shadow-sm ${(!password.trim() || !confirmPassword.trim()) ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                            {t('auth.register.continue')}
                        </button>

                        <button
                            type="button"
                            onClick={() => { setStep(2); setLocalError(null); }}
                            className="flex items-center text-[13px] font-bold text-[#1d4ed8] hover:text-blue-800 transition-colors pt-2"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1.5" />
                            {t('auth.register.back')}
                        </button>

                        <div className="text-center pt-6">
                            <p className="text-[14px] text-slate-500 dark:text-slate-400 font-medium">
                                {t('auth.signin.signin_prompt')}{' '}
                                <a href={`/${language}/login`} onClick={(e) => { e.preventDefault(); navigate(`/${language}/login`); }} className="text-[#1d4ed8] dark:text-blue-400 font-bold hover:underline">
                                    {t('auth.signin.signin')}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {step === 4 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="mb-8">
                        <h2 className="text-[28px] font-bold text-slate-900 dark:text-white mb-2 tracking-tight">{t('auth.register.title')}</h2>
                        <p className="text-[15px] font-medium text-slate-500 dark:text-slate-400">{t('auth.register.completeProfile')}</p>
                    </div>

                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <zap-input
                                label={t('auth.register.firstName')}
                                placeholder={t('auth.register.firstNamePlaceholder')}
                                icon-start="user"
                                value={firstName}
                                onInput={(e: any) => { setFirstName(e.detail?.value || e.target.value); setLocalError(null); }}
                                fullwidth
                            ></zap-input>
                            <zap-input
                                label={t('auth.register.lastName')}
                                placeholder={t('auth.register.lastNamePlaceholder')}
                                icon-start="user"
                                value={lastName}
                                onInput={(e: any) => { setLastName(e.detail?.value || e.target.value); setLocalError(null); }}
                                fullwidth
                            ></zap-input>
                        </div>

                        <zap-input
                            label={t('auth.register.merchantAccount')}
                            placeholder={t('auth.register.merchantPlaceholder')}
                            icon-start="building-2"
                            value={merchantName}
                            onInput={(e: any) => handleMerchantNameChange(e.detail?.value || e.target.value)}
                            fullwidth
                        ></zap-input>

                        <div className="space-y-2">
                            <label className="text-[12px] font-bold text-slate-700 uppercase tracking-tight ml-1">URL:</label>
                            <div className="flex items-center w-full px-4 h-12 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 overflow-hidden shadow-inner translate-y-[-2px]">
                                <span className="text-slate-400 font-medium select-none">zap.vn/</span>
                                <span className="text-[#1d4ed8] font-bold truncate">{merchantUrl || '...'}</span>
                            </div>
                        </div>

                        <div className="pb-2">
                            {isEmailContact ? (
                                <zap-input
                                    label={t('auth.register.phoneLabel')}
                                    placeholder={t('auth.register.phoneLabelPlaceholder')}
                                    icon-start="phone"
                                    value={phone}
                                    onInput={(e: any) => { setPhone(e.detail?.value || e.target.value); setLocalError(null); }}
                                    fullwidth
                                ></zap-input>
                            ) : (
                                <zap-input
                                    label={t('auth.register.email')}
                                    placeholder={t('auth.register.emailPlaceholder')}
                                    icon-start="mail"
                                    value={email}
                                    onInput={(e: any) => { setEmail(e.detail?.value || e.target.value); setLocalError(null); }}
                                    fullwidth
                                ></zap-input>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={handleFinish}
                            disabled={isLoading || !firstName.trim() || !lastName.trim() || !merchantName.trim() || !merchantUrl.trim() || (isEmailContact ? !phone.trim() : !email.trim())}
                            className={`w-full flex items-center justify-center bg-[#1d4ed8] hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg h-12 transition-colors shadow-sm ${(isLoading || !firstName.trim() || !lastName.trim() || !merchantName.trim() || !merchantUrl.trim() || (isEmailContact ? !phone.trim() : !email.trim())) ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? `${t('auth.register.submit')}...` : t('auth.register.submit')}
                        </button>

                        <button
                            type="button"
                            onClick={() => { setStep(3); setLocalError(null); }}
                            className="flex items-center text-[13px] font-bold text-[#1d4ed8] hover:text-blue-800 transition-colors pt-2"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1.5" />
                            {t('auth.register.back')}
                        </button>

                        <div className="text-center pt-6">
                            <p className="text-[14px] text-slate-500 dark:text-slate-400 font-medium">
                                {t('auth.signin.signin_prompt')}{' '}
                                <a href={`/${language}/login`} onClick={(e) => { e.preventDefault(); navigate(`/${language}/login`); }} className="text-[#1d4ed8] dark:text-blue-400 font-bold hover:underline">
                                    {t('auth.signin.signin')}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal: Account Exists */}
            {showAccountExistsModal && (
                <zap-dialog 
                    id="account-exists-modal" 
                    title={t('auth.register.accountExistsTitle') || "Tài khoản đã tồn tại"} 
                    description={t('auth.register.accountExistsDesc') || "Email hoặc số điện thoại này đã được đăng ký trong hệ thống. Bạn có muốn đăng nhập ngay?"}
                    open=""
                >
                    <div slot="footer" className="flex gap-3 justify-end w-full">
                        <zap-button label={t('common.cancel')} variant="outlined" onClick={() => setShowAccountExistsModal(false)}></zap-button>
                        <zap-button label={t('auth.login.title')} variant="contained" onClick={() => navigate(`/${language}/login?email=${encodeURIComponent(contact)}&step=2`)}></zap-button>
                    </div>
                </zap-dialog>
            )}
        </div>
    );
};

export default SignUpForm;
