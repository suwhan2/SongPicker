import React from 'react';

interface DescriptionProps {
  text: string;
}
const MemberSelectDescription = ({ text }: DescriptionProps) => {
  return <p className="text-lg text-[#F0A9F5]">{text}</p>;
};

export default MemberSelectDescription;
