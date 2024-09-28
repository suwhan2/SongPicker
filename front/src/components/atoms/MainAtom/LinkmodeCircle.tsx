import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkConnectionStatus } from '../../../services/connection';

const LinkmodeCircle = () => {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConnectionStatus = async () => {
      try {
        const response = await checkConnectionStatus();
        setIsConnected(response.body);
      } catch (error) {
        console.error('Failed to fetch connection status:', error);
        setIsConnected(false);
      }
    };

    fetchConnectionStatus();
    const intervalId = setInterval(fetchConnectionStatus, 5000); // 5초마다 연결 상태 확인

    return () => clearInterval(intervalId);
  }, []);

  const handleClick = () => {
    navigate('/member-select');
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer text-sm font-semibold text-center size-[82px] rounded-full flex flex-col items-center justify-center ${
        isConnected ? 'border-[#50FFB3] border-2' : 'border-2'
      }`}
    >
      <p>{isConnected ? '연결됨' : 'QR코드로'}</p>
      <p>{isConnected ? '연결중' : '연결하기'}</p>
    </div>
  );
};

export default LinkmodeCircle;
