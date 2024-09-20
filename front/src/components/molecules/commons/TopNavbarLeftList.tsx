import React from 'react';
import NavLogoIcon from '../../atoms/commons/NavLogoIcon';
import NavLogoText from '../../atoms/commons/NavLogoText';

type Props = {
  title?: string;
};

const TopNavbarLeftList = ({ title }: Props) => {
  return (
    <div className="flex items-center">
      {title ? (
        <h1 className="text-white text-lg font-bold">{title}</h1>
      ) : (
        <>
          <NavLogoIcon />
          <NavLogoText />
        </>
      )}
    </div>
  );
};

export default TopNavbarLeftList;
