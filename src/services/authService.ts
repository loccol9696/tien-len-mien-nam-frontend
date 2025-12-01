import api from './api'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

export interface VerifyRegisterRequest {
  email: string
  otpCode: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface VerifyForgotPasswordRequest {
  email: string
  otpCode: string
  password: string
  confirmPassword: string
}

export interface GoogleLoginRequest {
  authorizationCode: string
}

export interface AuthResponse {
  token: string
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
}

export const authService = {
  register: async (data: RegisterRequest): Promise<ApiResponse<void>> => {
    const response = await api.post<ApiResponse<void>>('/auth/register', data)
    return response.data
  },

  verifyRegister: async (data: VerifyRegisterRequest): Promise<ApiResponse<void>> => {
    const response = await api.post<ApiResponse<void>>('/auth/register/verify', data)
    return response.data
  },

  login: async (data: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', data)
    return response.data
  },

  forgotPassword: async (data: ForgotPasswordRequest): Promise<ApiResponse<void>> => {
    const response = await api.post<ApiResponse<void>>('/auth/password/forgot', data)
    return response.data
  },

  verifyForgotPassword: async (data: VerifyForgotPasswordRequest): Promise<ApiResponse<void>> => {
    const response = await api.patch<ApiResponse<void>>('/auth/password/forgot/verify', data)
    return response.data
  },

  googleLogin: async (data: GoogleLoginRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login/google', data)
    return response.data
  },
}

