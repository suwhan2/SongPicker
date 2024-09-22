import React from 'react';
import { HiHashtag } from 'react-icons/hi';

interface HashtagIconProps {
  isActive: boolean;
}

const HashtagIcon = ({ isActive }: HashtagIconProps) => {
  const activeColor = '#9747FF';
  const inactiveColor = 'white';

  return (
    <div className="flex flex-col items-center">
      <HiHashtag className="h-[26px] w-auto mb-1" color={isActive ? activeColor : inactiveColor} />
      <p className={`text-[10px] ${isActive ? 'text-[#9747FF]' : 'text-white'}`}>테마</p>
    </div>
  );
};

export default HashtagIcon;
