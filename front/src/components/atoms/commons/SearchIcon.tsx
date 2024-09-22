import React from 'react';
import { IoSearch } from 'react-icons/io5';

interface SearchIconProps {
  isActive: boolean;
}

const SearchIcon = ({ isActive }: SearchIconProps) => {
  const activeColor = '#9747FF';
  const inactiveColor = 'white';

  return (
    <div className="flex flex-col items-center">
      <IoSearch className="h-[26px] w-auto mb-1" color={isActive ? activeColor : inactiveColor} />
      <p className={`text-[10px] ${isActive ? 'text-[#9747FF]' : 'text-white'}`}>검색</p>
    </div>
  );
};

export default SearchIcon;
