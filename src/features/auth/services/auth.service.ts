// import axiosClient from '../../../shared/services/axiosClient';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, ForgotPasswordResponse, ResetPasswordRequest, ResetPasswordResponse, ActivateRequest, ActivateResponse, ResendOtpResponse, CheckAccountRequest, CheckAccountResponse, VerifyRegistrationOtpRequest, VerifyRegistrationOtpResponse, VerifyOtpRequest, VerifyOtpResponse } from '../types/auth.types';
// import { API_ENDPOINTS } from '../../../shared/constants';

// =============================================
// MOCK MODE: Comment API thật, trả về success
// để chạy giao diện không cần backend
// =============================================

const delay = (ms = 500) => new Promise(res => setTimeout(res, ms));

export const authService = {
    login: async (_data: LoginRequest): Promise<LoginResponse> => {
        // return axiosClient.post(API_ENDPOINTS.AUTH.LOGIN, data);
        await delay();
        return { success: true, Success: true, AccessToken: 'mock-access-token', RefreshToken: 'mock-refresh-token', MerchantName: 'demo' } as any;
    },
    register: async (_data: RegisterRequest): Promise<RegisterResponse> => {
        // return axiosClient.post(API_ENDPOINTS.AUTH.REGISTER, data);
        await delay();
        return { success: true, Success: true } as any;
    },
    forgotPassword: async (_email: string): Promise<ForgotPasswordResponse> => {
        // return axiosClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { Email: email });
        await delay();
        return { success: true, Success: true } as any;
    },
    resetPassword: async (_data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
        // return axiosClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
        await delay();
        return { success: true, Success: true } as any;
    },
    activate: async (_data: ActivateRequest): Promise<ActivateResponse> => {
        // return axiosClient.post(API_ENDPOINTS.AUTH.ACTIVATE, data);
        await delay();
        return { success: true, Success: true } as any;
    },
    resendOtp: async (_email: string): Promise<ResendOtpResponse> => {
        // return axiosClient.post(API_ENDPOINTS.AUTH.RESEND_OTP, { Email: email });
        await delay();
        return { success: true, Success: true, message: 'Đã gửi lại mã OTP' } as any;
    },
    checkAccount: async (_data: CheckAccountRequest): Promise<CheckAccountResponse> => {
        // return axiosClient.post(API_ENDPOINTS.AUTH.CHECK_ACCOUNT, data);
        await delay();
        return { success: true, Success: true } as any;
    },
    verifyRegistrationOtp: async (_data: VerifyRegistrationOtpRequest): Promise<VerifyRegistrationOtpResponse> => {
        // return axiosClient.post(API_ENDPOINTS.AUTH.VERIFY_REGISTRATION_OTP, data);
        await delay();
        return { success: true, Success: true } as any;
    },
    verifyOtp: async (_data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
        // return axiosClient.post(API_ENDPOINTS.AUTH.VERIFY_OTP, data);
        await delay();
        return { success: true, Success: true, Token: 'mock-token' } as any;
    },
};
