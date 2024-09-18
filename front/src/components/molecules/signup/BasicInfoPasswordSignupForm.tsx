import React, { useState, useEffect } from 'react';
import BasicInput from '../../atoms/signup/SignupInput';
import PasswordVisibilityToggle from '../../atoms/commons/PasswordVisibilityToggle';

type BasicInfoPasswordFormProps = {
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValidation: (isValid: boolean) => void;
};

const BasicInfoPasswordForm = ({ password, onChange, onValidation }: BasicInfoPasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  
  // 각 조건의 상태를 관리
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [isContentValid, setIsContentValid] = useState(false);

  useEffect(() => {
    const lengthValid = password.length >= 8 && password.length <= 16;
    const contentValid = /[A-Za-z]/.test(password) && /\d/.test(password) && /[@$!%*?&]/.test(password);

    setIsLengthValid(lengthValid);
    setIsContentValid(contentValid);

    // 두 조건이 모두 만족하면 전체 valid 상태 true
    onValidation(lengthValid && contentValid);
  }, [password, onValidation]);

  // 두 조건이 모두 만족하면 메시지를 보여주지 않음
  const allValid = isLengthValid && isContentValid;

  return (
    <div className="relative h-24">
      <label htmlFor="password" className="block text-lg text-white mb-2">비밀번호</label>
      <div className="relative">
        <BasicInput
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호를 입력해주세요"
          value={password}
          name="password"
          onChange={onChange}
          className="w-full pr-10"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <PasswordVisibilityToggle
            showPassword={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
          />
        </div>
      </div>

      {/* 두 조건이 모두 충족되지 않았을 때만 메시지를 표시 */}
      {!allValid && (
        <ul className="list-disc list-inside text-sm mt-2 space-y-1">
          <li className={isLengthValid ? 'text-green-500' : 'text-red-500'}>
            최소 8자리 이상, 최대 16자리 이하
          </li>
          <li className={isContentValid ? 'text-green-500' : 'text-red-500'}>
            영문자, 숫자, 특수문자 포함
          </li>
        </ul>
      )}
    </div>
  );
};

export default BasicInfoPasswordForm;
