import React, { useState } from 'react';
import SignupInput from '../../atoms/signup/SignupInput';
import SignupButton from '../../atoms/signup/SignupButton';

type UserInfoPhoneSignupFormProps = {
  onVerify: () => void; // 인증을 위한 상태 변경
  onResetAuthCode: () => void; // 인증번호 초기화 콜백
};

const UserInfoPhoneSignupForm = ({ onVerify, onResetAuthCode }: UserInfoPhoneSignupFormProps) => {
  const [phone, setPhone] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [showAuthCodeForm, setShowAuthCodeForm] = useState(false); // 인증번호 폼 표시 여부

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPhone(value);
    setIsAvailable(value.length === 11); // 번호가 11자리인지 확인
  };

  const handleVerify = () => {
    if (isAvailable) {
      setShowAuthCodeForm(true); // 인증번호 폼을 띄움
      onVerify(); // 부모 컴포넌트에 인증 상태 전달
    }
  };

  const handleRetry = () => {
    setShowAuthCodeForm(false); // 인증번호 폼을 숨김
    setPhone(''); // 입력된 휴대폰 번호 초기화
    setIsAvailable(false); // 인증 가능 상태 초기화
    onResetAuthCode(); // 인증번호를 초기화하는 콜백 호출
  };

  return (
    <div className="h-24">
      <label htmlFor="phone" className="block text-lg text-white mb-2">휴대폰 번호</label>
      <div className="flex items-center">
        <SignupInput
          id="phone"
          name="phone"
          type="tel"
          placeholder="휴대폰 번호를 입력해주세요"
          value={phone}
          onChange={handleChange}
          className="flex-grow"
          maxLength={11}
          disabled={showAuthCodeForm} // 인증번호 폼이 뜨면 번호 수정 불가
        />
        <div className="ml-[18px]">
          {!showAuthCodeForm && (
            <SignupButton
              disabled={!isAvailable}
              onClick={handleVerify}
            >
              인증하기
            </SignupButton>
          )}
          {showAuthCodeForm && (
            <SignupButton onClick={handleRetry}>
              다시 받기
            </SignupButton>
          )}
        </div>
      </div>
      {isAvailable && !showAuthCodeForm && (
        <ul className="list-disc list-inside text-green-500 text-sm mt-1">
          <li>사용 가능한 번호입니다.</li>
        </ul>
      )}
      {!isAvailable && phone.length > 0 && (
        <ul className="list-disc list-inside text-red-500 text-sm mt-1">
          <li>올바른 휴대폰 번호를 입력해주세요.</li>
        </ul>
      )}
    </div>
  );
};

export default UserInfoPhoneSignupForm;
