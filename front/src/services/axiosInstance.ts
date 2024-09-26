import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios';

interface RefreshTokenResponse {
  code: string;
  message: string;
  data: null;
}

// ApiError 인터페이스를 AxiosError를 확장하도록 수정
interface ApiError extends AxiosError {
  response?: AxiosError['response'] & {
    data: {
      code: string;
      message: string;
    };
  };
  config: InternalAxiosRequestConfig & { _retry?: boolean };
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: function (status: number): boolean {
    return status >= 200 && status < 500;
  },
});

const getAccessToken = (): string | null => localStorage.getItem('accessToken');
const setAccessToken = (token: string): void => localStorage.setItem('accessToken', token);
const getRefreshToken = (): string | null => localStorage.getItem('refreshToken');

const refreshAccessToken = async (): Promise<string> => {
  console.log('Attempting to refresh access token');
  try {
    const response: AxiosResponse<RefreshTokenResponse> = await axios.post(
      '/api/auths/refresh',
      {},
      {
        withCredentials: true, // HttpOnly 쿠키를 위해 추가
      }
    );

    console.log('Refresh token response:', response.data);

    if (response.data.code === 'AU104') {
      const newAccessToken = response.headers['authorization'];
      if (typeof newAccessToken === 'string') {
        setAccessToken(newAccessToken);
        console.log('New access token received and set');
        return newAccessToken;
      } else {
        console.error('New access token is missing in headers');
        throw new Error('New access token is missing in headers');
      }
    } else {
      console.error(`Failed to refresh token: ${response.data.message}`);
      throw new Error(`Failed to refresh token: ${response.data.message}`);
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Added token to request:', config.url);
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    console.log('Response received:', response.config.url, response.status);
    return response;
  },
  async (error: AxiosError): Promise<AxiosResponse> => {
    const apiError = error as ApiError;
    console.error('Response error:', apiError.response?.status, apiError.response?.data);

    if (apiError.response?.data.code === 'AU005' && !apiError.config._retry) {
      console.log('Access token expired, attempting refresh');
      apiError.config._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        apiError.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        console.log('Retrying original request with new token');
        return axiosInstance(apiError.config);
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
