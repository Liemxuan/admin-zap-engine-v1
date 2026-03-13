import axiosClient from '../../../shared/services/axiosClient';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, ForgotPasswordResponse, ResetPasswordRequest, ResetPasswordResponse, ActivateRequest, ActivateResponse, ResendOtpResponse, CheckAccountRequest, CheckAccountResponse, VerifyRegistrationOtpRequest, VerifyRegistrationOtpResponse } from '../types/auth.types';
import { API_ENDPOINTS } from '../../../shared/constants';

export const authService = {
    login: (data: LoginRequest): Promise<LoginResponse> => {
        return axiosClient.post(API_ENDPOINTS.AUTH.LOGIN, data);
    },
    register: (data: RegisterRequest): Promise<RegisterResponse> => {
        return axiosClient.post(API_ENDPOINTS.AUTH.REGISTER, data);
    },
    forgotPassword: (email: string): Promise<ForgotPasswordResponse> => {
        return axiosClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { Email: email });
    },
    resetPassword: (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
        return axiosClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
    },
    activate: (data: ActivateRequest): Promise<ActivateResponse> => {
        return axiosClient.post(API_ENDPOINTS.AUTH.ACTIVATE, data);
    },
    resendOtp: (email: string): Promise<ResendOtpResponse> => {
        return axiosClient.post(API_ENDPOINTS.AUTH.RESEND_OTP, { Email: email });
    },
    checkAccount: (data: CheckAccountRequest): Promise<CheckAccountResponse> => {
        return axiosClient.post(API_ENDPOINTS.AUTH.CHECK_ACCOUNT, data);
    },
    verifyRegistrationOtp: (data: VerifyRegistrationOtpRequest): Promise<VerifyRegistrationOtpResponse> => {
        return axiosClient.post(API_ENDPOINTS.AUTH.VERIFY_REGISTRATION_OTP, data);
    },
};
