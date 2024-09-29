import React, { ReactNode } from 'react';
import SubTopNavbar from '../components/molecules/commons/SubTopNavbar';

type SimpleLayoutProps = {
  children: ReactNode;
  title: string;
  centerContent?: boolean;
  onBackButtonClick?: () => void;
};

const SimpleLayout = ({
  children,
  title,
  centerContent = false,
  onBackButtonClick,
}: SimpleLayoutProps) => {
  return (
    <div className="flex flex-col w-full h-screen bg-black text-white">
      <div className="flex-shrink-0">
        <SubTopNavbar title={title} onBackButtonClick={onBackButtonClick} />
      </div>
      <div className={`flex-grow  ${centerContent ? 'flex items-center justify-center' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default SimpleLayout;
