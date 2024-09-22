import React from 'react';

interface TitleProps {
  text: string;
  className?: string;
}

const MemeberSelectTitle = ({ text, className = '' }: TitleProps) => {
  return <div className={`text-3xl mb-2  ${className}`}>{text}</div>;
};

export default MemeberSelectTitle;
