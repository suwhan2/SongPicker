import React from 'react';
import TopNavbarLeftList from '../../molecules/commons/TopNavbarLeftList';
import TopNavbarRightList from '../../molecules/commons/TopNavbarRightList';

type Props = {
  title?: string;
};

const TopNavbar = ({ title }: Props) => {
  return (
    <nav className="sticky w-screen max-w-[640px] mx-auto top-0 left-0 h-[60px] bg-[#222] flex items-center px-4 py-2 justify-between">
      <TopNavbarLeftList title={title} />
      <TopNavbarRightList />
    </nav>
  );
};

export default TopNavbar;
