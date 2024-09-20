import React from 'react';

type SignupStepTextProps = {
  text: string;
};

const SignupStepText = ({ text }: SignupStepTextProps) => {
  return <p className="text-center text-xl">{text}</p>;
};

export default SignupStepText;
