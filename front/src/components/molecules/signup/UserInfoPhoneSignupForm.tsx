import React, { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import SignupInput from '../../atoms/signup/SignupInput';
import SignupButton from '../../atoms/signup/SignupButton';
import useAuthStore from '../../../stores/useAuthStore';
import UserInfoAuthCodeSignupForm from './UserInfoAuthCodeSignupForm';

type UserInfoPhoneSignupFormProps = {
  onVerify: () => void;
  onResetAuthCode: () => void;
  onChange: (phone: string) => void;
  onValidation: (isValid: boolean) => void;
};

const UserInfoPhoneSignupForm = ({
  onVerify,
  onResetAuthCode,
  onChange,
  onValidation,
}: UserInfoPhoneSignupFormProps) => {
  const [phone, setPhone] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isPhoneAvailable, setIsPhoneAvailable] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState('');
  const [showAuthCode, setShowAuthCode] = useState(false);
  const [resetAuthCode, setResetAuthCode] = useState(false);

  const checkPhoneAvailability = useAuthStore(state => state.checkPhoneAvailability);
  const sendPhoneVerification = useAuthStore(state => state.sendPhoneVerification);

  const debouncedCheckAvailability = useCallback(
    debounce(async (phoneNumber: string) => {
      if (phoneNumber.length === 11) {
        setIsChecking(true);
        console.log('Checking phone availability:', phoneNumber);
        try {
          const available = await checkPhoneAvailability(phoneNumber);
          console.log('Phone availability result:', available);
          setIsPhoneAvailable(available);
          setError(available ? '' : '이미 등록된 전화번호입니다.');
          onValidation(available);
        } catch (error) {
          console.error('Phone check failed:', error);
          setError('전화번호 확인 중 오류가 발생했습니다.');
          onValidation(false);
        } finally {
          setIsChecking(false);
        }
      }
    }, 300),
    [checkPhoneAvailability, onValidation]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^0-9]/g, '');
      setPhone(value);
      onChange(value);
      setIsPhoneValid(value.length === 11);
      if (value.length === 11) {
        debouncedCheckAvailability(value);
      } else {
        setIsPhoneAvailable(false);
        onValidation(false);
      }
    },
    [onChange, debouncedCheckAvailability, onValidation]
  );

  const handleSendVerification = useCallback(async () => {
    if (isPhoneValid && isPhoneAvailable) {
      console.log('Sending phone verification:', phone);
      const sent = await sendPhoneVerification(phone, 'signup');
      console.log('Phone verification send result:', sent);
      if (sent) {
        setShowAuthCode(true);
        setResetAuthCode(prev => !prev);
        onVerify();
      } else {
        setError('인증번호 전송에 실패했습니다.');
      }
    }
  }, [isPhoneValid, isPhoneAvailable, phone, sendPhoneVerification, onVerify]);

  const handleVerifyComplete = useCallback(() => {
    onValidation(true);
  }, [onValidation]);

  return (
    <div className="h-24">
      <label htmlFor="phone" className="block text-lg text-white mb-2">
        휴대폰 번호
      </label>
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
        />
        <div className="ml-[18px]">
          <SignupButton
            disabled={!isPhoneValid || !isPhoneAvailable || showAuthCode}
            onClick={handleSendVerification}
          >
            {showAuthCode ? '재전송' : '인증하기'}
          </SignupButton>
        </div>
      </div>
      <div className="h-6 mt-1">
        {isChecking && (
          <ul className="list-disc list-inside text-yellow-500 text-sm">
            <li>확인 중...</li>
          </ul>
        )}
        {!isChecking && isPhoneValid && isPhoneAvailable && (
          <ul className="list-disc list-inside text-green-500 text-sm">
            <li>사용 가능한 전화번호입니다.</li>
          </ul>
        )}
        {error && (
          <ul className="list-disc list-inside text-red-500 text-sm">
            <li>{error}</li>
          </ul>
        )}
      </div>
      {showAuthCode && (
        <UserInfoAuthCodeSignupForm onVerify={handleVerifyComplete} resetAuthCode={resetAuthCode} />
      )}
    </div>
  );
};

export default UserInfoPhoneSignupForm;
