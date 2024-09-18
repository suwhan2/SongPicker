import React from 'react';

type SignupProfileButtonProps = {
  onClick: () => void;
};

const SignupProfileButton = ({ onClick }: SignupProfileButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-32 h-10 px-2 py-1 bg-primary hover:bg-secondary text-white rounded-md text-sm transition-colors"
    >
      프로필 사진 선택
    </button>
  );
};

export default SignupProfileButton;