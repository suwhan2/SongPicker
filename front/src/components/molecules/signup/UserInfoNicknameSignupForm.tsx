import React, { useState, useEffect } from 'react';
import SignupInput from '../../atoms/signup/SignupInput';

type UserInfoNicknameSignupFormProps = {
  onChange: (nickname: string) => void;
};

const UserInfoNicknameSignupForm = ({ onChange }: UserInfoNicknameSignupFormProps) => {
  const [nickname, setNickname] = useState('');
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [isContentValid, setIsContentValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    onChange(value);
  };

  useEffect(() => {
    const lengthValid = nickname.length >= 2 && nickname.length <= 8;
    const contentValid = /^(?:[a-zA-Z]{2,8}|[가-힣]{2,8}|[a-zA-Z0-9가-힣]{2,8})$/.test(nickname);

    setIsLengthValid(lengthValid);
    setIsContentValid(contentValid);
  }, [nickname]);

  const allValid = isLengthValid && isContentValid;

  return (
    <div className="h-24">
      <label htmlFor="nickname" className="block text-lg text-white mb-2">닉네임</label>
      <SignupInput
        id="nickname"
        name="nickname"
        type="text"
        placeholder="닉네임을 입력해주세요"
        value={nickname}
        onChange={handleChange}
        maxLength={8}
      />
      {!allValid && (
        <ul className="list-disc list-inside text-sm mt-2 space-y-1">
          <li className={isLengthValid ? 'text-green-500' : 'text-red-500'}>
            최소 2자리 이상, 최대 8자리 이하
          </li>
          <li className={isContentValid ? 'text-green-500' : 'text-red-500'}>
            영문자, 숫자, 한글만 가능
          </li>
        </ul>
      )}
      {allValid && (
        <ul className="list-disc list-inside text-green-500 text-sm mt-1">
          <li>사용 가능한 닉네임입니다.</li>
        </ul>
      )}
    </div>
  );
};

export default UserInfoNicknameSignupForm;