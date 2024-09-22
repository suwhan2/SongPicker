import React, { useState } from 'react';
import UserInfoPhoneSignupForm from '../molecules/signup/UserInfoPhoneSignupForm';
import UserInfoAuthCodeSignupForm from '../molecules/signup/UserInfoAuthCodeSignupForm';

type Props = {
  onVerificationComplete: (isComplete: boolean) => void;
};

const FindId = ({ onVerificationComplete }: Props) => {
  const [phone, setPhone] = useState('');
  const [showAuthCode, setShowAuthCode] = useState(false);
  const [resetAuthCode, setResetAuthCode] = useState(false);

  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };

  const handlePhoneVerify = () => {
    console.log('Sending verification code to:', phone);
    setShowAuthCode(true);
    setResetAuthCode(false);
    onVerificationComplete(false);
  };

  const handleResetAuthCode = () => {
    setResetAuthCode(true);
    onVerificationComplete(false);
    console.log('Resending verification code to:', phone);
  };

  const handleAuthCodeVerify = () => {
    console.log('Verifying auth code');
    onVerificationComplete(true);
  };

  return (
    <div className="mt-4">
      <div className="text-xl mb-6 font-semibold">
        아이디를 찾기 위해
        <br /> 휴대폰 번호를 인증해주세요.
      </div>
      <UserInfoPhoneSignupForm
        onVerify={handlePhoneVerify}
        onResetAuthCode={handleResetAuthCode}
        onChange={handlePhoneChange}
        showLabel={false}
      />
      {showAuthCode && (
        <UserInfoAuthCodeSignupForm onVerify={handleAuthCodeVerify} resetAuthCode={resetAuthCode} />
      )}
    </div>
  );
};

export default FindId;
