import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import FooterButtonLayout from '../layouts/FooterButtonLayout';
import SignupStepText from '../components/atoms/signup/SignupStepText';
import SignupBasicInfoForm from '../components/organisms/signup/SignupBasicInfoForm';
import SignupUserInfoForm from '../components/organisms/signup/SignupUserInfoForm';
import SignupCompleteInfo from '../components/organisms/signup/SignupCompleteInfo';
import useAuthStore from '../stores/useAuthStore';

interface SignupData {
  loginId: string;
  password: string;
  name: string;
  nickname: string;
  birth: string;
  phone: string;
  gender: 'MALE' | 'FEMALE';
  role: 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_OWNER';
}

const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const register = useAuthStore(state => state.register);
  const [isValid, setIsValid] = useState(false);
  const [signupData, setSignupData] = useState<SignupData>({
    loginId: '',
    password: '',
    name: '',
    nickname: '',
    birth: '',
    phone: '',
    gender: 'MALE',
    role: 'ROLE_USER',
  });
  const contentRef = useRef<HTMLDivElement>(null);

  const getCurrentStep = () => {
    if (location.pathname.includes('basic-info')) return 1;
    if (location.pathname.includes('user-info')) return 2;
    if (location.pathname.includes('complete')) return 3;
    return 1;
  };

  const currentStep = getCurrentStep();

  const handleNext = useCallback(async () => {
    if (currentStep < 2 && isValid) {
      const nextPaths = ['basic-info', 'user-info', 'complete'];
      navigate(`/signup/${nextPaths[currentStep]}`);
      setIsValid(false);
    } else if (currentStep === 2 && isValid) {
      try {
        // console.log('회원가입 시도:', JSON.stringify(signupData, null, 2));
        await register(signupData);
        console.log('회원가입 성공');
        navigate(`/signup/complete`);
      } catch (error) {
        console.error('회원가입 실패:', error);
      }
    } else if (currentStep === 3) {
      navigate('/login');
    }
  }, [currentStep, isValid, navigate, signupData, register]);

  const handleValidation = useCallback((valid: boolean) => {
    setIsValid(valid);
  }, []);

  const handleBasicInfoSubmit = useCallback((formData: { loginId: string; password: string }) => {
    setSignupData(prevData => ({ ...prevData, ...formData }));
  }, []);

  const handleUserInfoSubmit = useCallback(
    (formData: {
      name: string;
      nickname: string;
      birth: string;
      phone: string;
      gender: 'MALE' | 'FEMALE';
    }) => {
      const formattedBirth = formData.birth.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
      setSignupData(prevData => ({ ...prevData, ...formData, birth: formattedBirth }));
    },
    []
  );

  const getStepText = (step: number) => {
    switch (step) {
      case 1:
        return '사용하실 아이디와 비밀번호를\n입력해 주세요!';
      case 2:
        return '맞춤 추천을 위해\n회원 정보를 입력해 주세요!';
      case 3:
      default:
        return '';
    }
  };

  const adjustScroll = useCallback(() => {
    if (contentRef.current) {
      const activeElement = document.activeElement;
      if (activeElement && activeElement instanceof HTMLElement) {
        const rect = activeElement.getBoundingClientRect();
        const scrollTop = contentRef.current.scrollTop;
        const containerHeight = contentRef.current.clientHeight;

        if (rect.bottom > containerHeight) {
          contentRef.current.scrollTo({
            top: scrollTop + rect.bottom - containerHeight + 20,
            behavior: 'smooth',
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('focus', adjustScroll, true);
    return () => {
      window.removeEventListener('focus', adjustScroll, true);
    };
  }, [adjustScroll]);

  useEffect(() => {
    if (currentStep === 3) {
      setIsValid(true);
    }
  }, [currentStep]);

  return (
    <FooterButtonLayout
      title="회원가입"
      buttonText={currentStep === 3 ? '완료' : '다음'}
      onButtonClick={handleNext}
      isButtonValid={currentStep === 3 ? true : isValid}
      currentStep={currentStep}
    >
      <div ref={contentRef} className="max-w-[440px] w-full mx-auto p-6">
        <SignupStepText text={getStepText(currentStep)} />
        <form onSubmit={e => e.preventDefault()} className="mt-12">
          <Routes>
            <Route
              path="basic-info"
              element={
                <SignupBasicInfoForm
                  onValidation={handleValidation}
                  onSubmit={handleBasicInfoSubmit}
                  onInputChange={adjustScroll}
                />
              }
            />
            <Route
              path="user-info"
              element={
                <SignupUserInfoForm
                  onValidChange={handleValidation}
                  onSubmit={handleUserInfoSubmit}
                />
              }
            />
            <Route path="complete" element={<SignupCompleteInfo name={signupData.name} />} />
            <Route path="*" element={<Navigate to="basic-info" replace />} />
          </Routes>
        </form>
      </div>
    </FooterButtonLayout>
  );
};

export default SignupPage;
