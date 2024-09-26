import React, { ReactNode } from 'react';

type SignupStepTextProps = {
  text: ReactNode;
  className?: string;
};

const SignupStepText = ({ text, className = '' }: SignupStepTextProps) => {
  return (
    <div className={` text-xl ${className}`}>{typeof text === 'string' ? <p>{text}</p> : text}</div>
  );
};

export default SignupStepText;
