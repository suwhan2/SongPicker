import React, { useState } from 'react';
import SignupInput from '../../atoms/signup/SignupInput';
import SignupButton from '../../atoms/signup/SignupButton';

type UserInfoPhoneSignupFormProps = {
  onVerify: () => void;
  onResetAuthCode: () => void;
  onChange: (phone: string) => void;
  showLabel?: boolean;
};

const UserInfoPhoneSignupForm = ({ onVerify, onResetAuthCode, onChange, showLabel = true }: UserInfoPhoneSignupFormProps) => {
  const [phone, setPhone] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [showAuthCodeForm, setShowAuthCodeForm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPhone(value);
    setIsAvailable(value.length === 11);
    onChange(value);
  };

  const handleVerify = () => {
    if (isAvailable) {
      setShowAuthCodeForm(true);
      onVerify();
    }
  };

  const handleRetry = () => {
    setShowAuthCodeForm(false);
    setPhone('');
    setIsAvailable(false);
    onResetAuthCode();
  };

  return (
    <div className="h-24">
      {showLabel && (
        <label htmlFor="phone" className="block text-lg text-white mb-2">휴대폰 번호</label>
      )}
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
          disabled={showAuthCodeForm}
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
        <ul className="list-disc list-inside text-green-500 text-sm mt-2">
          <li>사용 가능한 번호입니다.</li>
        </ul>
      )}
      {!isAvailable && phone.length > 0 && (
        <ul className="list-disc list-inside text-red-500 text-sm mt-2">
          <li>올바른 휴대폰 번호를 입력해주세요.</li>
        </ul>
      )}
    </div>
  );
};

export default UserInfoPhoneSignupForm;