import React, { useState, useEffect, useCallback } from 'react';
import SignupInput from '../../atoms/signup/SignupInput';
import SignupButton from '../../atoms/signup/SignupButton';
import useAuthStore from '../../../stores/useAuthStore';

type UserInfoAuthCodeSignupFormProps = {
  onVerify: () => void;
  resetAuthCode: boolean;
};

const UserInfoAuthCodeSignupForm = ({
  onVerify,
  resetAuthCode,
}: UserInfoAuthCodeSignupFormProps) => {
  const [authCode, setAuthCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(180);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  const verifyPhoneCode = useAuthStore(state => state.verifyPhoneCode);

  useEffect(() => {
    if (resetAuthCode) {
      setAuthCode('');
      setIsVerified(false);
      setTimeLeft(180);
      setError('');
    }
  }, [resetAuthCode]);

  useEffect(() => {
    if (timeLeft > 0 && !isVerified) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft, isVerified]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthCode(e.target.value);
  };

  const handleVerify = useCallback(async () => {
    if (authCode.length === 6) {
      console.log('Verifying phone code:', authCode);
      const verified = await verifyPhoneCode(authCode, ''); // 전화번호는 상위 컴포넌트에서 관리되므로 빈 문자열 전달
      console.log('Phone code verification result:', verified);
      if (verified) {
        setIsVerified(true);
        onVerify();
        setError('');
      } else {
        setError('인증번호가 올바르지 않습니다.');
      }
    }
  }, [authCode, verifyPhoneCode, onVerify]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="h-24">
      <label htmlFor="authCode" className="block text-lg text-white mb-2">
        인증번호
      </label>
      <div className="flex items-center">
        <SignupInput
          id="authCode"
          name="authCode"
          type="number"
          placeholder="인증번호를 입력해주세요"
          value={authCode}
          onChange={handleChange}
          className="flex-grow"
          disabled={isVerified}
        />
        <div className="ml-[18px]">
          <SignupButton disabled={authCode.length !== 6 || isVerified} onClick={handleVerify}>
            확인하기
          </SignupButton>
        </div>
      </div>
      <div className="h-6 mt-1">
        {!isVerified && timeLeft > 0 && (
          <ul className="list-disc list-inside text-yellow-500 text-sm">
            <li>남은 시간: {formatTime(timeLeft)}</li>
          </ul>
        )}
        {isVerified && (
          <ul className="list-disc list-inside text-green-500 text-sm">
            <li>인증이 완료되었습니다.</li>
          </ul>
        )}
        {!isVerified && timeLeft === 0 && (
          <ul className="list-disc list-inside text-red-500 text-sm">
            <li>인증 시간이 만료되었습니다. 다시 시도해주세요.</li>
          </ul>
        )}
        {error && (
          <ul className="list-disc list-inside text-red-500 text-sm">
            <li>{error}</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserInfoAuthCodeSignupForm;
