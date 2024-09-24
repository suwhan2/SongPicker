import React from 'react';
import { FaCheck } from 'react-icons/fa';

type GenderButtonProps = {
  onClick: () => void;
  isSelected: boolean;
  label: string;
};

const SignupGenderButton = ({ onClick, isSelected, label }: GenderButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center justify-center
        w-full h-[35px] px-2 py-2 
        rounded-md text-sm text-white 
        transition-colors whitespace-nowrap
        ${isSelected ? 'bg-[#AAAAAA]' : 'bg-primary hover:bg-secondary'}
      `}
    >
      <div className="flex items-center justify-center w-full">
        {isSelected && <FaCheck className="mr-1" />}
        <span>{label}</span>
      </div>
    </button>
  );
};

export default SignupGenderButton;
