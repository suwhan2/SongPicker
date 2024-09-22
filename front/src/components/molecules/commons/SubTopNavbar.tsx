import React from 'react';
import BackButton from '../../atoms/commons/BackButton';

type SubTopNavbarProps = {
  title: string;
}

const SubTopNavbar = ({ title }: SubTopNavbarProps) => {
  return (
    <nav className="sticky w-screen max-w-[640px] mx-auto top-0 left-0 h-[60px] bg-[#222] flex items-center px-4 py-2">
      <div className="absolute bottom-3 left-4">
        <BackButton />
      </div>
      <h1 className="text-white text-lg font-bold w-full text-center">{title}</h1>
    </nav>
  );
};

export default SubTopNavbar;
