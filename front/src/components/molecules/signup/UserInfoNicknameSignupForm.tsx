import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import SignupInput from '../../atoms/signup/SignupInput';
import useAuthStore from '../../../stores/useAuthStore';

type UserInfoNicknameSignupFormProps = {
  onChange: (nickname: string) => void;
  onValidation: (isValid: boolean) => void;
};

const UserInfoNicknameSignupForm = ({
  onChange,
  onValidation,
}: UserInfoNicknameSignupFormProps) => {
  const [nickname, setNickname] = useState('');
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [isContentValid, setIsContentValid] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [message, setMessage] = useState('');

  const checkNicknameAvailability = useAuthStore(state => state.checkNicknameAvailability);

  const debouncedCheckAvailability = useCallback(
    debounce(async (value: string) => {
      if (isLengthValid && isContentValid) {
        setIsChecking(true);
        console.log('Checking nickname availability:', value);
        try {
          const { isAvailable, message } = await checkNicknameAvailability(value);
          console.log('Nickname availability result:', isAvailable, message);
          setIsAvailable(isAvailable);
          setMessage(message);
          onValidation(isAvailable);
        } finally {
          setIsChecking(false);
        }
      }
    }, 300),
    [isLengthValid, isContentValid, checkNicknameAvailability, onValidation]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setNickname(value);
      onChange(value);

      const lengthValid = value.length >= 2 && value.length <= 8;
      const contentValid = /^(?:[a-zA-Z]{2,8}|[가-힣]{2,8}|[a-zA-Z0-9가-힣]{2,8})$/.test(value);

      setIsLengthValid(lengthValid);
      setIsContentValid(contentValid);

      if (lengthValid && contentValid) {
        debouncedCheckAvailability(value);
      } else {
        setIsAvailable(false);
        onValidation(false);
        setMessage('');
      }
    },
    [onChange, debouncedCheckAvailability, onValidation]
  );

  return (
    <div className="h-24">
      <label htmlFor="nickname" className="block text-lg text-white mb-2">
        닉네임
      </label>
      <SignupInput
        id="nickname"
        name="nickname"
        type="text"
        placeholder="닉네임을 입력해주세요"
        value={nickname}
        onChange={handleChange}
        maxLength={8}
      />
      <div className="h-6 mt-1">
        {isChecking && (
          <ul className="list-disc list-inside text-yellow-500 text-sm">
            <li>확인 중...</li>
          </ul>
        )}
        {!isChecking && message && (
          <ul className="list-disc list-inside text-sm">
            <li className={isAvailable ? 'text-green-500' : 'text-red-500'}>{message}</li>
          </ul>
        )}
        {!isChecking && !isLengthValid && nickname.length > 0 && (
          <ul className="list-disc list-inside text-red-500 text-sm">
            <li>닉네임은 2~8자 사이여야 합니다.</li>
          </ul>
        )}
        {!isChecking && !isContentValid && nickname.length > 0 && (
          <ul className="list-disc list-inside text-red-500 text-sm">
            <li>영문, 한글, 숫자만 사용 가능합니다.</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserInfoNicknameSignupForm;
