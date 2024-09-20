import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/', // API 기본 URL 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
