import React, { useState, useEffect, useCallback } from 'react';
import SignupInput from '../../atoms/signup/SignupInput';
import SignupButton from '../../atoms/signup/SignupButton';

type BasicInfoIdFormProps = {
  loginId: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValidation: (isValid: boolean, isAvailable: boolean) => void;
};

const validateId = (id: string) => {
  const regex = /^[a-z0-9]{4,16}$/;
  return regex.test(id);
};

const BasicInfoIdForm = ({ loginId, onChange, onValidation }: BasicInfoIdFormProps) => {
  const [isIdValid, setIsIdValid] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const [error, setError] = useState('');

  // loginId가 변경될 때마다 유효성 검사를 수행
  useEffect(() => {
    const valid = validateId(loginId);

    // 유효성 검사 결과가 바뀌면 상태를 업데이트
    if (isIdValid !== valid) {
      setIsIdValid(valid);
      setError(valid ? '' : '4~16자의 영문 소문자, 숫자만 사용 가능합니다.');
    }

    // 중복 확인을 하지 않으면 isIdAvailable을 false로 설정
    if (!valid && isIdAvailable) {
      setIsIdAvailable(false);
    }

    // 유효성 검사 결과가 바뀌었을 때만 onValidation 호출
    onValidation(valid, isIdAvailable);
  }, [loginId, isIdAvailable, isIdValid, onValidation]);

  // 중복 확인 버튼 클릭 시 실행
  const handleCheckId = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isIdValid) {
      // API 호출을 통해 실제로 중복 확인
      setIsIdAvailable(true);
      setError('');
      onValidation(true, true);
    }
  }, [isIdValid, onValidation]);
  

  return (
    <div className="h-24">
      <label htmlFor="loginId" className="block text-lg text-white mb-2">아이디</label>
      <div className="relative flex items-center">
        <SignupInput
          id="loginId"
          type="text"
          placeholder="아이디를 입력해주세요"
          value={loginId}
          name="loginId"
          onChange={onChange}
          className="border-box"
        />
        <div className="ml-[18px]">
          <SignupButton 
            disabled={!isIdValid || isIdAvailable} 
            onClick={handleCheckId}
          >
            중복확인
          </SignupButton>
        </div>
      </div>
      <div className="h-6 mt-1">
        {isIdAvailable && (
          <ul className="list-disc list-inside text-green-500 text-sm">
            <li>사용 가능한 아이디입니다.</li>
          </ul>
        )}
        {error && (
          <ul className="list-disc list-inside text-sm text-red-500">
            <li>{error}</li>
          </ul>
        )}
        {isIdValid && !isIdAvailable && (
          <ul className="list-disc list-inside text-sm text-yellow-500">
            <li>중복확인을 해주세요</li>
          </ul>
        )}
      </div>

    </div>
  );
};

export default BasicInfoIdForm;
