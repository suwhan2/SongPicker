import React, { useState } from 'react';
import GenderButton from '../../atoms/signup/SignupGenderButton';

type UserInfoGenderSignupFormProps = {
  onChange: (gender: 'male' | 'female') => void;
};

const UserInfoGenderSignupForm = ({ onChange }: UserInfoGenderSignupFormProps) => {
  const [gender, setGender] = useState<'male' | 'female' | null>(null);

  const handleGenderSelect = (selectedGender: 'male' | 'female') => {
    setGender(selectedGender);
    onChange(selectedGender);
  };

  return (
    <div className="h-24">
      <label className="block text-lg text-white mb-2">성별</label>
      <div className="flex space-x-4">
        <GenderButton
          onClick={() => handleGenderSelect('male')}
          isSelected={gender === 'male'}
          label="남"
        />
        <GenderButton
          onClick={() => handleGenderSelect('female')}
          isSelected={gender === 'female'}
          label="여"
        />
      </div>
    </div>
  );
};

export default UserInfoGenderSignupForm;
