import React, { ReactNode } from 'react';

type SignupButtonProps = {
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  className?: string;
};

const SignupButton = ({ disabled, onClick, children, className }: SignupButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!disabled) {
      onClick(e);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`px-2 py-2 rounded-md text-sm text-white transition-colors whitespace-nowrap ${
        disabled ? 'bg-[#AAAAAA] cursor-not-allowed' : 'bg-primary hover:bg-secondary'
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default SignupButton;
