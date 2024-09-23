import React from 'react';

type LoginButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
};

const LoginButton = ({ onClick, children }: LoginButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-primary w-full bg-primary hover:bg-secondary text-white text-xl"
    >
      {children}
    </button>
  );
};

export default LoginButton;
