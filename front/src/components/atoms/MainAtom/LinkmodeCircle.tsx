import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQRConnectionStore } from '../../../stores/useQRConnectionStore ';
import useAuthStore from '../../../stores/useAuthStore';

const LinkmodeCircle = () => {
  const { isConnected, machineNumber } = useQRConnectionStore();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isAuthenticated) {
      alert('로그인 후 이용하실 수 있습니다.');
      // 알림 창이 완전히 닫힌 후 라우팅하기 위해 setTimeout 사용
      setTimeout(() => {
        // 라우팅 직전에 다시 한 번 인증 상태 확인
        if (!useAuthStore.getState().isAuthenticated) {
          navigate('/login');
        }
      }, 100);
    } else {
      navigate('/member-select');
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer font-semibold text-center size-24 rounded-full flex flex-col items-center justify-center ${
        isConnected ? 'border-[#50FFB3] border-2' : 'border-2'
      }`}
    >
      <p>{isConnected ? machineNumber : 'QR코드로'}</p>
      <p>{isConnected ? '연결중' : '연결하기'}</p>
    </div>
  );
};

export default LinkmodeCircle;
