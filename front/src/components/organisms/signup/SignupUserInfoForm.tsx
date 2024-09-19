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
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | null>(null);

  useEffect(() => {
    const isValid = isPhoneVerified && 
                    isAuthCodeVerified && 
                    name.trim() !== '' && 
                    nickname.trim() !== '' && 
                    birth.trim() !== '' && 
                    gender !== null;
    onValidChange(isValid);

    if (isValid) {
      onSubmit({
        name,
        nickname,
        birth,
        phone,
        gender: gender as 'MALE' | 'FEMALE',
      });
    }
  }, [isPhoneVerified, isAuthCodeVerified, name, nickname, birth, phone, gender, onValidChange, onSubmit]);

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
    setGender(selectedGender === 'male' ? 'MALE' : 'FEMALE');
  };

  return (
    <div className="flex flex-col space-y-12 min-w-72 w-full">
      <UserInfoNameSignupForm onChange={setName} />
      <UserInfoNicknameSignupForm onChange={setNickname} />
      <UserInfoPhoneSignupForm onVerify={handlePhoneVerification} onResetAuthCode={handleResetAuthCode} onChange={setPhone} />
      {showAuthCode && (
        <UserInfoAuthCodeSignupForm onVerify={handleAuthCodeVerification} resetAuthCode={resetAuthCode} />
      )}
      <UserInfoBirthSignupForm onChange={setBirth} />
      <UserInfoGenderSignupForm onChange={handleGenderChange} />
    </div>
  );
};

export default SignupUserInfoForm;