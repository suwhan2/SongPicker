import React, { ReactNode } from 'react';
import TopNavbar from '../components/organisms/commons/TopNavbar';
import BottomNavbar from '../components/organisms/commons/BottomNavbar';

type MainLayoutProps = {
  children: ReactNode;
  title?: string;
};

const MainLayout = ({ children, title }: MainLayoutProps) => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-black text-white">
      {/* <div className="flex-shrink-0"> */}
      <TopNavbar title={title} />
      {/* </div> */}
      <div className="flex-grow overflow-y-auto overflow-x-hidden relative pb-[60px]">
        {children}
      </div>
      {/* <div className="flex-shrink-0"> */}
      <BottomNavbar />
      {/* </div> */}
    </div>
  );
};

export default MainLayout;
