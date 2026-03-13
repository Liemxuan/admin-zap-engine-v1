import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LoginFormStep1 } from './login/LoginFormStep1';
import { LoginFormStep2 } from './login/LoginFormStep2';
import { LoginFormStepOtp } from './login/LoginFormStepOtp';
import { authService } from '../services/auth.service';

/**
 * LoginForm component refactored to support multi-step flow
 */
export const LoginForm: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    // Initialize state from query params if available
    const initialStep = parseInt(queryParams.get('step') || '1', 10);
    const initialEmail = queryParams.get('email') || '';

    const [step, setStep] = useState(initialStep);
    const [email, setEmail] = useState(initialEmail);
    const [isOtpLoading, setIsOtpLoading] = useState(false);

    // Sync state if query params change (optional but good for UX)
    useEffect(() => {
        const urlEmail = queryParams.get('email');
        const urlStep = queryParams.get('step');
        if (urlEmail) setEmail(urlEmail);
        if (urlStep) setStep(parseInt(urlStep, 10));
    }, [location.search]);
    
    const handleNext = (val: string) => {
        setEmail(val);
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleSwitchToOtp = async () => {
        setIsOtpLoading(true);
        try {
            await authService.resendOtp(email);
            setStep(3);
        } catch (err) {
            console.error("Failed to send initial OTP:", err);
            // Optionally show error here if needed
        } finally {
            setIsOtpLoading(false);
        }
    };

    const handleSwitchToPassword = () => {
        setStep(2);
    };

    return (
        <div className="relative">
            {step === 1 && (
                <LoginFormStep1 onNext={handleNext} />
            )}
            {step === 2 && (
                <LoginFormStep2 
                    email={email} 
                    onBack={handleBack} 
                    onSwitchToOtp={handleSwitchToOtp} 
                    isOtpLoading={isOtpLoading}
                />
            )}
            {step === 3 && (
                <LoginFormStepOtp 
                    email={email} 
                    onBack={handleBack} 
                    onSwitchToPassword={handleSwitchToPassword} 
                />
            )}
        </div>
    );
};
