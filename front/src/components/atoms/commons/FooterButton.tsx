import { useState, useEffect } from 'react';

type FooterButtonProps = {
  // eslint-disable-next-line no-undef
  onClick: (e?: React.MouseEvent | React.FormEvent) => void;
  isValid: boolean;
  // eslint-disable-next-line no-undef
  children: React.ReactNode;
};

const FooterButton = ({ onClick, isValid, children }: FooterButtonProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(isValid);
  }, [isValid]);

  // eslint-disable-next-line no-undef
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 버튼 클릭 시 새로고침 방지
    if (isActive) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!isActive}
      className={`w-full h-[60px] text-lg font-bold flex items-center justify-center ${
        isActive
          ? 'bg-gradient-to-r from-[#575ED2] to-[#9747FF] text-white'
          : 'bg-[#AAAAAA] text-white cursor-not-allowed'
      }`}
    >
      {children}
    </button>
  );
};

export default FooterButton;
