import React, { useState } from 'react';
import SignupInput from '../../atoms/signup/SignupInput';

type UserInfoBirthSignupFormProps = {
  onChange: (birth: string) => void;
};

const UserInfoBirthSignupForm = ({ onChange }: UserInfoBirthSignupFormProps) => {
  const [birth, setBirth] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 8) {
      setBirth(value);
      onChange(value);
    }
  };

  const formatBirth = (value: string) => {
    if (value.length > 4) {
      return `${value.slice(0, 4)}.${value.slice(4, 6)}.${value.slice(6, 8)}`;
    } else if (value.length > 2) {
      return `${value.slice(0, 4)}.${value.slice(4)}`;
    }
    return value;
  };

  return (
    <div className="h-24">
      <label htmlFor="birth" className="block text-lg text-white mb-2">
        생년월일
      </label>
      <SignupInput
        id="birth"
        name="birth"
        type="text"
        placeholder="YYYY.MM.DD"
        value={formatBirth(birth)}
        onChange={handleChange}
        maxLength={10}
      />
    </div>
  );
};

export default UserInfoBirthSignupForm;
