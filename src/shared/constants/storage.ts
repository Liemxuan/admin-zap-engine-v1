/**
 * Local storage keys used throughout the application
 */
export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
    MERCHANT_NAME: 'merchantName',
    LANGUAGE: 'language',
    REMEMBER_MERCHANT: 'remember_merchant',
    REMEMBER_USER: 'remember_user',
    REMEMBER_PASS: 'remember_pass',
    IS_REMEMBER: 'is_remember',
} as const;

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: 'Authentication/login',
        REGISTER: 'Auth/register-merchant',
        FORGOT_PASSWORD: 'Auth/forgot-password',
        RESET_PASSWORD: 'Auth/reset-password',
        ACTIVATE: 'Auth/active-account',
        RESEND_OTP: 'Auth/resend-otp',
        CHECK_ACCOUNT: 'Auth/check-account',
        VERIFY_REGISTRATION_OTP: 'Auth/verify-registration-otp',
        VERIFY_OTP: 'Auth/verify-otp',
    }
} as const;

export const APP_CONFIG = {
    TITLE: 'ZAP CRM',
    DEFAULT_LANGUAGE: 'vi',
} as const;
