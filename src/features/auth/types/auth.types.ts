export interface RegisterRequest {
    MerchantName: string;
    Email: string;
    Phone: string;
    Password: string;
    Provider: string;
    ConfirmPass?: string; // Optional if not sent to backend
    FirstName?: string;
    LastName?: string;
    VerifyEmail?: boolean;
    IsVerify?: boolean;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    detail: string;
}

export interface LoginRequest {
    Email: string;
    Password?: string;
    IsRemember: boolean;
    Otp?: string;
}

export interface LoginResponse {
    success?: boolean;
    Success?: boolean;
    message?: string;
    Message?: string;
    detail?: string;
    Detail?: string;
    errorCode?: string;
    ErrorCode?: string;
    redirectUrl?: string;
    RedirectUrl?: string;
    MerchantName: string;
    AccessToken: string;
    Acronym: string;
    Avatar: string;
    Color: string;
    ExpiresIn: number;
    FullName: string;
    RefreshToken: string;
    Role: string;
    UpdateDate: string;
    UserGuid: string;
    Permissions: any[];
    Screens: any[];
}
export interface ForgotPasswordRequest {
    Email: string;
}

export interface ForgotPasswordResponse {
    success?: boolean;
    Success?: boolean;
    message?: string;
    Message?: string;
    detail?: string;
    Detail?: string;
    ResetToken?: string;
    ExpiresIn?: number;
}

export interface VerifyOtpRequest {
    ResetToken: string;
    Otp: string;
}

export interface VerifyOtpResponse {
    success?: boolean;
    Success?: boolean;
    message?: string;
    Message?: string;
    detail?: string;
    Detail?: string;
    ConfirmToken?: string;
}
export interface ResetPasswordRequest {
    ConfirmToken: string;
    NewPassword: string;
    ConfirmPassword: string;
}

export interface ResetPasswordResponse {
    success?: boolean;
    Success?: boolean;
    message?: string;
    Message?: string;
    detail?: string;
    Detail?: string;
}
export interface ActivateRequest {
    Email: string;
    Otp: string;
}

export interface ActivateResponse {
    success?: boolean;
    Success?: boolean;
    message?: string;
    Message?: string;
    detail?: string;
    Detail?: string;
}

export interface ResendOtpResponse {
    success?: boolean;
    Success?: boolean;
    message?: string;
    Message?: string;
    detail?: string;
    Detail?: string;
}

export interface CheckAccountRequest {
    Email: string;
    IsLogin?: boolean;
}

export interface CheckAccountResponse {
    success?: boolean;
    Success?: boolean;
    message?: string;
    Message?: string;
    detail?: string;
    Detail?: string;
    errorCode?: string;
    ErrorCode?: string;
}

export interface VerifyRegistrationOtpRequest {
    Email: string;
    Otp: string;
}

export interface VerifyRegistrationOtpResponse {
    success?: boolean;
    Success?: boolean;
    message?: string;
    Message?: string;
    detail?: string;
    Detail?: string;
    errorCode?: string;
    ErrorCode?: string;
}
