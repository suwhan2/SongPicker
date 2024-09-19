import React, { useState, useEffect } from 'react';
import SignupInput from '../../atoms/signup/SignupInput';
import SignupButton from '../../atoms/signup/SignupButton';

type UserInfoAuthCodeSignupFormProps = {
  onVerify: () => void; // 인증번호 확인 후 상태 업데이트
  resetAuthCode: boolean; // 인증번호 초기화 여부
};

const UserInfoAuthCodeSignupForm = ({ onVerify, resetAuthCode }: UserInfoAuthCodeSignupFormProps) => {
  const [authCode, setAuthCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3분 타이머
  const [isVerified, setIsVerified] = useState(false);

  // 인증번호 초기화
  useEffect(() => {
    if (resetAuthCode) {
      setAuthCode(''); // 인증번호 입력란을 초기화
      setIsVerified(false); // 인증 완료 상태 초기화
      setTimeLeft(180); // 타이머 리셋
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

  const handleVerify = () => {
    if (authCode.length === 6) {
      setIsVerified(true); // 인증 완료 상태로 변경
      onVerify(); // 부모 컴포넌트에 인증 완료 전달
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="h-24">
      <label htmlFor="authCode" className="block text-lg text-white mb-2">인증번호</label>
      <div className="flex items-center">
        <SignupInput
          id="authCode"
          name="authCode"
          type="number"
          placeholder="인증번호를 입력해주세요"
          value={authCode}
          onChange={handleChange}
          className="flex-grow"
          disabled={isVerified} // 인증 완료 시 입력 비활성화
        />
        <div className="ml-[18px]">
          <SignupButton
            disabled={authCode.length !== 6 || isVerified}
            onClick={handleVerify}
          >
            확인하기
          </SignupButton>
        </div>
      </div>
      {!isVerified && timeLeft > 0 && (
        <ul className="list-disc list-inside text-yellow-500 text-sm mt-1">
          <li>남은 시간: {formatTime(timeLeft)}</li>
        </ul>
      )}
      {isVerified && (
        <ul className="list-disc list-inside text-green-500 text-sm mt-1">
          <li>인증이 완료되었습니다.</li>
        </ul>
      )}
      {!isVerified && timeLeft === 0 && (
        <ul className="list-disc list-inside text-red-500 text-sm mt-1">
          <li>인증 시간이 만료되었습니다. 다시 시도해주세요.</li>
        </ul>
      )}
    </div>
  );
};

export default UserInfoAuthCodeSignupForm;
