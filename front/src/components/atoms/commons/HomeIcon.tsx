import React from 'react';
import { IoMdHome } from 'react-icons/io';

interface HomeIconProps {
  isActive: boolean;
}

const HomeIcon = ({ isActive }: HomeIconProps) => {
  const activeColor = '#9747FF';
  const inactiveColor = 'white';

  return (
    <div className="flex flex-col items-center">
      <IoMdHome className="h-[26px] w-auto mb-1" color={isActive ? activeColor : inactiveColor} />
      <p className={`text-[10px] ${isActive ? 'text-[#9747FF]' : 'text-white'}`}>홈</p>
    </div>
  );
};

export default HomeIcon;
