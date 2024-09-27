import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

type CustomAlertProps = {
  title: string;
  description: string;
  onClose: () => void;
};

const CustomAlert = ({ title, description, onClose }: CustomAlertProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1200);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-[70px] left-1/2 transform -translate-x-1/2 w-[95vw] max-w-sm z-[9999]">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg p-4 text-white">
        <h3 className="text-xl font-bold mb-2 text-shadow">{title}</h3>
        <p className="text-sm leading-relaxed whitespace-pre-line text-shadow">{description}</p>
        <button
          className="absolute top-2 right-2 text-white hover:text-gray-200 transition-colors"
          onClick={onClose}
        >
          <IoClose size={20} />
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
