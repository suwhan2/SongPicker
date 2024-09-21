import React, { useState, useEffect } from 'react';
import UserInfoNameSignupForm from '../../molecules/signup/UserInfoNameSignupForm';
import UserInfoNicknameSignupForm from '../../molecules/signup/UserInfoNicknameSignupForm';
import UserInfoPhoneSignupForm from '../../molecules/signup/UserInfoPhoneSignupForm';
import UserInfoAuthCodeSignupForm from '../../molecules/signup/UserInfoAuthCodeSignupForm';
import UserInfoBirthSignupForm from '../../molecules/signup/UserInfoBirthSignupForm';
import UserInfoGenderSignupForm from '../../molecules/signup/UserInfoGenderSignupForm';

type UserInfoSignupFormProps = {
  onValidChange: (isValid: boolean) => void;
  onSubmit: (formData: {
    name: string;
    nickname: string;
    birth: string;
    phone: string;
    gender: 'MALE' | 'FEMALE';
  }) => void;
};

const SignupUserInfoForm = ({ onValidChange, onSubmit }: UserInfoSignupFormProps) => {
  const [showAuthCode, setShowAuthCode] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isAuthCodeVerified, setIsAuthCodeVerified] = useState(false);
  const [resetAuthCode, setResetAuthCode] = useState(false);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE');

  const formatBirthDate = (dateString: string): string => {
    // 입력된 날짜가 YYYYMMDD 형식이라고 가정
    if (dateString.length === 8) {
      return `${dateString.slice(0, 4)}-${dateString.slice(4, 6)}-${dateString.slice(6, 8)}`;
    }
    return dateString; // 형식이 맞지 않으면 원래 문자열 반환
  };

  useEffect(() => {
    const isValid =
      isPhoneVerified &&
      isAuthCodeVerified &&
      name.trim() !== '' &&
      nickname.trim() !== '' &&
      birth.trim() !== '' &&
      phone.trim() !== '';
    onValidChange(isValid);

    if (isValid) {
      const formattedBirth = formatBirthDate(birth);
      onSubmit({
        name,
        nickname,
        birth: formattedBirth,
        phone,
        gender,
      });
    }
  }, [
    isPhoneVerified,
    isAuthCodeVerified,
    name,
    nickname,
    birth,
    phone,
    gender,
    onValidChange,
    onSubmit,
  ]);

  const handlePhoneVerification = () => {
    setShowAuthCode(true);
    setIsPhoneVerified(true);
  };

  const handleAuthCodeVerification = () => {
    setIsAuthCodeVerified(true);
  };

  const handleResetAuthCode = () => {
    setShowAuthCode(false);
    setResetAuthCode(true);
    setTimeout(() => setResetAuthCode(false), 0);
    setIsPhoneVerified(false);
  };

  const handleGenderChange = (selectedGender: 'male' | 'female') => {
    const genderValue = selectedGender === 'male' ? 'MALE' : 'FEMALE';
    setGender(genderValue);
  };

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleNicknameChange = (value: string) => {
    setNickname(value);
  };

  const handleBirthChange = (value: string) => {
    setBirth(value);
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };

  return (
    <div className="flex flex-col space-y-12 min-w-72 w-full">
      <UserInfoNameSignupForm onChange={handleNameChange} />
      <UserInfoNicknameSignupForm onChange={handleNicknameChange} />
      <UserInfoPhoneSignupForm
        onVerify={handlePhoneVerification}
        onResetAuthCode={handleResetAuthCode}
        onChange={handlePhoneChange}
      />
      {showAuthCode && (
        <UserInfoAuthCodeSignupForm
          onVerify={handleAuthCodeVerification}
          resetAuthCode={resetAuthCode}
        />
      )}
      <UserInfoBirthSignupForm onChange={handleBirthChange} />
      <UserInfoGenderSignupForm onChange={handleGenderChange} />
    </div>
  );
};

export default SignupUserInfoForm;
