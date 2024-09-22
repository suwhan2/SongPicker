import React from 'react';
import { FaSpinner } from 'react-icons/fa';

interface ConnectionModalProps {
  isVisible: boolean;
}

const ConnectionModal = ({ isVisible }: ConnectionModalProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#333] p-8 rounded-lg shadow-xl flex flex-col items-center">
        <FaSpinner className="animate-spin text-6xl text-primary mb-6" />
        <p className="text-xl font-semibold text-center">
          노래방기계와 연결중입니다 <br />
          잠시만 기다려주세요!
        </p>
      </div>
    </div>
  );
};

export default ConnectionModal;
