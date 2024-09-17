import React, { useState, useEffect } from 'react';
import UserInfoImgSignupForm from '../../molecules/signup/UserInfoImgSignupForm';
import UserInfoNameSignupForm from '../../molecules/signup/UserInfoNameSignupForm';
import UserInfoNicknameSignupForm from '../../molecules/signup/UserInfoNicknameSignupForm';
import UserInfoPhoneSignupForm from '../../molecules/signup/UserInfoPhoneSignupForm';
import UserInfoAuthCodeSignupForm from '../../molecules/signup/UserInfoAuthCodeSignupForm';
import UserInfoBirthSignupForm from '../../molecules/signup/UserInfoBirthSignupForm';
import UserInfoGenderSignupForm from '../../molecules/signup/UserInfoGenderSignupForm';

type UserInfoSignupFormProps = {
  onValidChange: (isValid: boolean) => void;
};

const UserInfoSignupForm = ({ onValidChange }: UserInfoSignupFormProps) => {
  const [showAuthCode, setShowAuthCode] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isAuthCodeVerified, setIsAuthCodeVerified] = useState(false);
  const [resetAuthCode, setResetAuthCode] = useState(false); // 인증번호 초기화 여부 상태
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);

  useEffect(() => {
    const isValid = isPhoneVerified && 
                    isAuthCodeVerified && 
                    name.trim() !== '' && 
                    nickname.trim() !== '' && 
                    birth.trim() !== '' && 
                    gender !== null;
    onValidChange(isValid);
  }, [isPhoneVerified, isAuthCodeVerified, name, nickname, birth, gender, onValidChange]);

  const handlePhoneVerification = () => {
    setShowAuthCode(true); // 인증번호 폼 표시
    setIsPhoneVerified(true); // 휴대폰 인증 완료 상태
  };

  const handleAuthCodeVerification = () => {
    setIsAuthCodeVerified(true); // 인증번호 확인 완료
  };

  const handleResetAuthCode = () => {
    setShowAuthCode(false); // 인증번호 폼을 숨기고 휴대폰 입력 단계로 복귀
    setResetAuthCode(true); // 인증번호 리셋 상태 설정
    setTimeout(() => setResetAuthCode(false), 0); // 한 번 리셋한 후 바로 false로 다시 설정
    setIsPhoneVerified(false); // 휴대폰 인증도 다시 하도록 상태 초기화
  };

  const handleGenderChange = (selectedGender: 'male' | 'female') => {
    setGender(selectedGender);
  };

  return (
    <div className="flex flex-col space-y-12 min-w-72 w-full">
      <UserInfoImgSignupForm />
      <UserInfoNameSignupForm onChange={setName} />
      <UserInfoNicknameSignupForm onChange={setNickname} />
      <UserInfoPhoneSignupForm onVerify={handlePhoneVerification} onResetAuthCode={handleResetAuthCode} />
      {showAuthCode && (
        <UserInfoAuthCodeSignupForm onVerify={handleAuthCodeVerification} resetAuthCode={resetAuthCode} />
      )}
      <UserInfoBirthSignupForm onChange={setBirth} />
      <UserInfoGenderSignupForm onChange={handleGenderChange} />
    </div>
  );
};

export default UserInfoSignupForm;