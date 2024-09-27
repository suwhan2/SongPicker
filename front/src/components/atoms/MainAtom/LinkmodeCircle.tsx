import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../stores/useAuthStore';
import axiosInstance from '../../../services/axiosInstance';

const LinkmodeCircle = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [machineNumber, setMachineNumber] = useState('');
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkConnectionStatus = async () => {
  //     try {
  //       const response = await axiosInstance.get('/api/connections');
  //       setIsConnected(response.data.isConnected);
  //       setMachineNumber(response.data.machineNumber || '');
  //     } catch (error) {
  //       console.error('Failed to fetch connection status:', error);
  //       setIsConnected(false);
  //       setMachineNumber('');
  //     }
  //   };

  //   checkConnectionStatus();
  //   const intervalId = setInterval(checkConnectionStatus, 5000); // 5초마다 연결 상태 확인

  //   return () => clearInterval(intervalId);
  // }, []);

  const handleClick = async () => {
    if (!isAuthenticated) {
      alert('로그인 후 이용하실 수 있습니다.');
      navigate('/login');
    } else {
      navigate('/member-select');
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer text-sm font-semibold text-center size-[82px] rounded-full flex flex-col items-center justify-center ${
        isConnected ? 'border-[#50FFB3] border-2' : 'border-2'
      }`}
    >
      <p>{isConnected ? machineNumber : 'QR코드로'}</p>
      <p>{isConnected ? '연결중' : '연결하기'}</p>
    </div>
  );
};

export default LinkmodeCircle;
