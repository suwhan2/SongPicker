import React from 'react';
import BottomNavIconList from '../../molecules/commons/BottomNavIconList';

const BottomNavbar = () => {
  return (
    <nav className="py-2 px-4 fixed bottom-0 left-0 right-0 mx-auto w-screen max-w-[640px] h-[60px] flex items-center bg-[#1D1D1D] rounded-t-3xl border-t border-[#333]">
      <BottomNavIconList />
    </nav>
  );
};

export default BottomNavbar;
