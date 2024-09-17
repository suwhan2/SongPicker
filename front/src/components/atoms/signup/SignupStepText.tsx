import React from 'react';

type SignupStepTextProps = {
  text: string;
};

const SignupStepText = ({ text }: SignupStepTextProps) => {
  return (
    <div className="text-xl font-medium text-white h-[48px] whitespace-pre-line">
      {text}
    </div>
  );
};

export default SignupStepText;