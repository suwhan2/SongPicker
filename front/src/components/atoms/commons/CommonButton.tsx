import React from 'react';

interface CommonButtonProps {
  backgroundColor: string;
  text: string;
  textColor?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const CommonButton = ({ 
  backgroundColor, 
  text, 
  textColor = 'white', 
  onClick, 
  disabled = false 
}: CommonButtonProps) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`fixed bottom-0 w-screen max-w-[640px] mx-auto h-[60px] text-2xl flex items-center justify-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{ 
        background: backgroundColor,
        color: textColor,
      }}
    >
      {text}
    </button>
  );
};

export default CommonButton;