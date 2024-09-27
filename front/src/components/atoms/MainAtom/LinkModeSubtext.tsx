import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../services/axiosInstance';

const LinkModeSubtext = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedMode, setSelectedMode] = useState('');

  // useEffect(() => {
  //   const checkConnectionStatus = async () => {
  //     try {
  //       const response = await axiosInstance.get('/api/connections');
  //       setIsConnected(response.data.isConnected);
  //       setSelectedMode(response.data.selectedMode || '');
  //     } catch (error) {
  //       console.error('Failed to fetch connection status:', error);
  //       setIsConnected(false);
  //       setSelectedMode('');
  //     }
  //   };

  //   checkConnectionStatus();
  //   const intervalId = setInterval(checkConnectionStatus, 5000); // 5초마다 연결 상태 확인

  //   return () => clearInterval(intervalId);
  // }, []);

  const getSubtext = () => {
    if (!isConnected) return '연결하고 더 많은 서비스를 이용해보세요 ';
    return `${selectedMode} 이용중`;
  };

  return <div>{getSubtext()}</div>;
};

export default LinkModeSubtext;
