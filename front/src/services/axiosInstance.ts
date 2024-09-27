import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import useAuthStore from '../stores/useAuthStore';

interface ApiErrorResponse {
  code: string;
  message: string;
  data: unknown;
}

interface ApiSuccessResponse<T = unknown> {
  code: string;
  message: string;
  data: T;
}

type ApiResponse<T = unknown> = ApiErrorResponse | ApiSuccessResponse<T>;

interface ApiError extends AxiosError {
  response?: AxiosResponse<ApiResponse>;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: function (status) {
    return status >= 200 && status < 500; // 409를 포함한 4xx 상태 코드를 오류로 처리하지 않음
  },
});

const isApiErrorResponse = (response: ApiResponse): response is ApiErrorResponse => {
  return response.code.startsWith('AU') && response.code !== 'AU104';
};

const refreshAccessToken = async (): Promise<string> => {
  try {
    console.log('Attempting to refresh token...');
    const response = await axios.post<ApiResponse>(
      '/api/api/auths/refresh',
      {},
      { withCredentials: true }
    );
    console.log('Refresh token response:', response.data);

    if (response.data.code === 'AU104') {
      const newAccessToken = response.headers['authorization'];
      if (typeof newAccessToken === 'string') {
        const formattedToken = newAccessToken.startsWith('Bearer ')
          ? newAccessToken
          : `Bearer ${newAccessToken}`;
        useAuthStore.getState().setAccessToken(formattedToken);
        console.log('New access token set in store:', formattedToken);
        return formattedToken;
      }
    }
    throw new Error('Failed to refresh token');
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = useAuthStore.getState().getAccessToken();
    if (token) {
      config.headers['Authorization'] = token;
      console.log('Added token to request:', config.url, token);
    } else {
      console.log('No token available for request:', config.url);
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response,
  async (error: ApiError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (
      error.response?.status === 401 &&
      error.response.data &&
      isApiErrorResponse(error.response.data)
    ) {
      if (error.response.data.code === 'AU005' && !originalRequest._retry) {
        console.log('Token expired, attempting to refresh...');
        originalRequest._retry = true;
        try {
          const newAccessToken = await refreshAccessToken();
          originalRequest.headers['Authorization'] = newAccessToken;
          console.log('Retrying original request with new token');
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('Failed to refresh token, logging out');
          useAuthStore.getState().logout();
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
