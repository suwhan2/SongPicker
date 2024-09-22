import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axiosInstance from '../services/axiosInstance';
import axios, { AxiosError } from 'axios';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  role: string | null;
  loginId: string | null;
  register: (userData: RegisterData) => Promise<void>;
  login: (accessToken: string, role: string, loginId: string) => void;
  logout: () => void;
  getAccessToken: () => string | null;
  getRole: () => string | null;
  getLoginId: () => string | null;
  checkLoginIdAvailability: (loginId: string) => Promise<boolean>;
  checkNicknameAvailability: (nickname: string) => Promise<boolean>;
  checkPhoneAvailability: (phone: string) => Promise<boolean>;
  sendPhoneVerification: (phone: string, purpose: string) => Promise<boolean>;
  verifyPhoneCode: (authCode: string, phone: string) => Promise<boolean>;
}

interface RegisterData {
  loginId: string;
  password: string;
  name: string;
  nickname: string;
  birth: string;
  phone: string;
  gender: 'MALE' | 'FEMALE';
  role: 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_OWNER';
}

interface ErrorResponse {
  message: string;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      accessToken: null,
      role: null,
      loginId: null,
      register: async (userData: RegisterData) => {
        console.log('Registering user with data:', JSON.stringify(userData, null, 2));
        try {
          const response = await axiosInstance.post('/api/members', userData);
          console.log('Registration API response:', response.data);
          // 회원가입 후 추가 작업 (예: 자동 로그인)이 필요하다면 여기에 구현
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;
            console.error(
              'Registration failed:',
              axiosError.response?.data?.message || 'Unknown error',
              '\nStatus:',
              axiosError.response?.status,
              '\nData:',
              axiosError.response?.data
            );
          } else {
            console.error('Registration failed:', (error as Error).message);
          }
          throw error;
        }
      },
      login: (accessToken: string, role: string, loginId: string) => {
        set({ isAuthenticated: true, accessToken, role, loginId });
      },
      logout: () => {
        set({ isAuthenticated: false, accessToken: null, role: null, loginId: null });
      },
      getAccessToken: () => get().accessToken,
      getRole: () => get().role,
      getLoginId: () => get().loginId,
      checkLoginIdAvailability: async (loginId: string) => {
        try {
          const response = await axiosInstance.get(`/api/members/check-id?loginId=${loginId}`);
          return response.data.status === 'ME101';
        } catch (error) {
          console.error('Login ID check failed:', error);
          return false;
        }
      },
      checkNicknameAvailability: async (nickname: string) => {
        try {
          const response = await axiosInstance.get(
            `/api/members/check-nickname?nickname=${nickname}`
          );
          return response.data.status === 'ME102';
        } catch (error) {
          console.error('Nickname check failed:', error);
          return false;
        }
      },
      checkPhoneAvailability: async (phone: string) => {
        try {
          const response = await axiosInstance.get(`/api/members/check-phone?phone=${phone}`);
          return response.data.status === 'ME103';
        } catch (error) {
          console.error('Phone check failed:', error);
          return false;
        }
      },
      sendPhoneVerification: async (phone: string, purpose: string) => {
        try {
          const response = await axiosInstance.post('/api/auth/send-verification', {
            phone,
            purpose,
          });
          return response.data.status === 'AU101';
        } catch (error) {
          console.error('Phone verification send failed:', error);
          return false;
        }
      },
      verifyPhoneCode: async (authCode: string, phone: string) => {
        try {
          const response = await axiosInstance.post('/api/auth/verify-code', { authCode, phone });
          return response.data.status === 'AU102';
        } catch (error) {
          console.error('Phone code verification failed:', error);
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
