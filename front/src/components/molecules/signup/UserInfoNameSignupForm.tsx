import React, { useState } from 'react';
import SignupInput from '../../atoms/signup/SignupInput';

type UserInfoNameSignupFormProps = {
  onChange: (name: string) => void;
};

const UserInfoNameSignupForm = ({ onChange }: UserInfoNameSignupFormProps) => {
  const [name, setName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    onChange(newName);
  };

  return (
    <div className="h-24">
      <label htmlFor="name" className="block text-lg text-white mb-2">
        이름
      </label>
      <SignupInput
        id="name"
        name="name"
        type="text"
        placeholder="이름을 입력해주세요"
        value={name}
        onChange={handleChange}
      />
    </div>
  );
};

export default UserInfoNameSignupForm;
