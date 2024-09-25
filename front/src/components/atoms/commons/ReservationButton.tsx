import React from 'react';
import { reserveSong } from '../../../services/connection';
import { isConnected, getConnectionInfo } from '../../../services/connectionStorage';

type Props = {
  songId: string;
  onShowConnectionModal: (
    message: string,
    icon: 'link' | 'spinner' | 'reservation',
    autoCloseDelay?: number
  ) => void;
};

function ReservationButton({ songId, onShowConnectionModal }: Props) {
  const handleClick = async () => {
    if (!isConnected()) {
      onShowConnectionModal('노래방과 연결을 먼저 해주세요!', 'link');
      return;
    }
  };

  return (
    <div
      className={`px-2 py-1.5 rounded-sm text-sm font-medium ${
        isConnected() ? 'bg-[#9747FF] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
      }`}
      onClick={handleClick}
    >
      예약
    </div>
  );
}

export default ReservationButton;
