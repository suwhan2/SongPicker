import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: function (status) {
    return status >= 200 && status < 500; // 409를 포함한 4xx 상태 코드를 오류로 처리하지 않음
  },
});

export default axiosInstance;
