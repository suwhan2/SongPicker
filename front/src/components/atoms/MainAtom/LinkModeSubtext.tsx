import React from 'react';
import { useQRConnectionStore } from '../../../stores/useQRConnectionStore ';

const LinkModeSubtext = () => {
  const { isConnected, selectedMode } = useQRConnectionStore();

  const getSubtext = () => {
    if (!isConnected) return '연결을 해주세요';
    return `${selectedMode} 이용중`;
  };

  return <div>{getSubtext()}</div>;
};

export default LinkModeSubtext;
