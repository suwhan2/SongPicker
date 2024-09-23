import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://songpicker.kro.kr/', // API 기본 URL 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
