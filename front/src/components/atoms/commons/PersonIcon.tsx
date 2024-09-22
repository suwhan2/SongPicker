import React from 'react';
import { IoPersonCircle } from 'react-icons/io5';

interface PersonIconProps {
  isActive: boolean;
}

const PersonIcon = ({ isActive }: PersonIconProps) => {
  const activeColor = '#9747FF';
  const inactiveColor = 'white';

  return (
    <div className="flex flex-col items-center">
      <IoPersonCircle
        className="h-[26px] w-auto mb-1"
        color={isActive ? activeColor : inactiveColor}
      />
      <p className={`text-[10px] ${isActive ? 'text-[#9747FF]' : 'text-white'}`}>마이페이지</p>
    </div>
  );
};

export default PersonIcon;
