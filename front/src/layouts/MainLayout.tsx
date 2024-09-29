import React, { ReactNode } from 'react';
import TopNavbar from '../components/organisms/commons/TopNavbar';
import BottomNavbar from '../components/organisms/commons/BottomNavbar';

type MainLayoutProps = {
  children: ReactNode;
  title?: string;
  fixedContent?: ReactNode;
};

const MainLayout = ({ children, title, fixedContent }: MainLayoutProps) => {
  return (
    <div className="flex flex-col w-full h-screen bg-black text-white">
      <div className="flex-shrink-0"> 
        <TopNavbar title={title} />
      </div>
      <div className="flex-grow flex flex-col overflow-hidden relative pb-[60px]">
        {fixedContent && (
          <div className="flex-shrink-0 bg-black z-10 sticky top-0 border-b border-primary">
            {fixedContent}
          </div>
        )}
        <div className="flex-grow overflow-y-auto overflow-x-hidden">{children}</div>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default MainLayout;
