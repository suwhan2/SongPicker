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
  checkLoginIdAvailability: (loginId: string) => Promise<{ isAvailable: boolean; message: string }>;
  checkNicknameAvailability: (
    nickname: string
  ) => Promise<{ isAvailable: boolean; message: string }>;
  checkPhoneAvailability: (phone: string) => Promise<{ isAvailable: boolean; message: string }>;
  sendPhoneVerification: (
    phone: string,
    purpose: string
  ) => Promise<{ isSuccess: boolean; message: string }>;
  verifyPhoneCode: (
    authCode: string,
    phone: string
  ) => Promise<{ isSuccess: boolean; message: string }>;
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
          const response = await axiosInstance.get(`/api/members/check-id`, {
            params: { loginId },
          });
          const { code, message } = response.data;
          switch (code) {
            case 'ME101':
              return { isAvailable: true, message: '사용 가능한 아이디입니다.' };
            case 'ME001':
              return { isAvailable: false, message: '이미 사용 중인 아이디입니다.' };
            default:
              return { isAvailable: false, message: '아이디 확인 중 오류가 발생했습니다.' };
          }
        } catch (error) {
          console.error('Login ID check failed:', error);
          return { isAvailable: false, message: '아이디 확인 중 오류가 발생했습니다.' };
        }
      },

      checkNicknameAvailability: async (nickname: string) => {
        try {
          const response = await axiosInstance.get(`/api/members/check-nickname`, {
            params: { nickname },
          });
          const { code, message } = response.data;
          switch (code) {
            case 'ME102':
              return { isAvailable: true, message: '사용 가능한 닉네임입니다.' };
            case 'ME003':
              return { isAvailable: false, message: '이미 사용 중인 닉네임입니다.' };
            default:
              return { isAvailable: false, message: '닉네임 확인 중 오류가 발생했습니다.' };
          }
        } catch (error) {
          console.error('Nickname check failed:', error);
          return { isAvailable: false, message: '닉네임 확인 중 오류가 발생했습니다.' };
        }
      },

      checkPhoneAvailability: async (phone: string) => {
        try {
          const response = await axiosInstance.get(`/api/members/check-phone`, {
            params: { phone },
          });
          const { code, message } = response.data;
          switch (code) {
            case 'ME103':
              return { isAvailable: true, message: '사용 가능한 휴대폰 번호입니다.' };
            case 'ME004':
              return { isAvailable: false, message: '이미 등록된 휴대폰 번호입니다.' };
            default:
              return { isAvailable: false, message: '휴대폰 번호 확인 중 오류가 발생했습니다.' };
          }
        } catch (error) {
          console.error('Phone check failed:', error);
          return { isAvailable: false, message: '휴대폰 번호 확인 중 오류가 발생했습니다.' };
        }
      },

      sendPhoneVerification: async (phone: string, purpose: string, loginId?: string) => {
        try {
          const requestBody: { phone: string; purpose: string; loginId?: string } = {
            phone,
            purpose,
          };
          if (purpose === 'findPassword' && loginId) {
            requestBody.loginId = loginId;
          }

          const response = await axiosInstance.post('/api/auth/phone/send', requestBody);
          const { code, message } = response.data;
          switch (code) {
            case 'AU101':
              return { isSuccess: true, message: '인증번호가 전송되었습니다.' };
            case 'CN000':
              return { isSuccess: false, message: '인증번호 전송에 실패했습니다.' };
            case 'ME007':
              return { isSuccess: false, message: '전화번호를 다시 확인해주세요.' };
            case 'ME008':
              return { isSuccess: false, message: '중복 확인을 먼저 진행해주세요.' };
            default:
              return { isSuccess: false, message: '인증번호 전송 중 오류가 발생했습니다.' };
          }
        } catch (error) {
          console.error('Phone verification send failed:', error);
          return { isSuccess: false, message: '인증번호 전송 중 오류가 발생했습니다.' };
        }
      },

      verifyPhoneCode: async (authCode: string, phone: string) => {
        try {
          const response = await axiosInstance.post('/api/auth/phone/verify', { authCode, phone });
          const { code, message } = response.data;
          switch (code) {
            case 'AU102':
              return { isSuccess: true, message: '인증이 완료되었습니다.' };
            case 'AU002':
              return { isSuccess: false, message: '인증번호가 올바르지 않습니다.' };
            default:
              return { isSuccess: false, message: '인증 확인 중 오류가 발생했습니다.' };
          }
        } catch (error) {
          console.error('Phone code verification failed:', error);
          return { isSuccess: false, message: '인증 확인 중 오류가 발생했습니다.' };
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
