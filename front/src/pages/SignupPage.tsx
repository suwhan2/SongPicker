import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SubTopNavbar from '../components/molecules/commons/SubTopNavbar';
import StepIndicator from '../components/molecules/signup/SignupStepIndicator';
import FooterButton from '../components/atoms/commons/FooterButton';
import BasicInfoForm from '../components/organisms/signup/BasicInfoSignupForm';
import UserInfoSignupForm from '../components/organisms/signup/UserInfoSignupForm';
import SignupStepText from '../components/atoms/signup/SignupStepText';

const SignupPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isValid, setIsValid] = useState(false);
  const [signupData, setSignupData] = useState({
    loginId: '',
    password: '',
    name: '',
    nickname: '',
    birth: '',
    phone: '',
    gender: '',
    role: 'USER'
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleNext = (e?: React.MouseEvent | React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (currentStep < 4 && isValid) {
      if (currentStep === 2) {
        // 회원가입 API 호출 대신 콘솔에 데이터 출력
        console.log('회원가입 데이터:', signupData);
      }
      setCurrentStep(currentStep + 1);
      setIsValid(false);
    } else if (currentStep === 4) {
      navigate('/login');
    }
  };

  const handleValidation = useCallback((valid: boolean) => {
    setIsValid(valid);
  }, []);
  
  const handleBasicInfoSubmit = useCallback((formData: { loginId: string; password: string }) => {
    setSignupData(prevData => ({ ...prevData, ...formData }));
  }, []);

  const handleUserInfoSubmit = useCallback((formData: {
    name: string;
    nickname: string;
    birth: string;
    phone: string;
    gender: 'MALE' | 'FEMALE';
  }) => {
    setSignupData(prevData => ({ ...prevData, ...formData }));
  }, []);

  const getStepText = (step: number) => {
    switch (step) {
      case 1:
        return '사용하실 아이디와 비밀번호를\n입력해 주세요!';
      case 2:
        return '맞춤 추천을 위해\n회원 정보를 입력해 주세요!';
      case 3:
        return '애창곡이 있으신가요?\n5곡 이상 선택하시면 맞춤 콘텐츠를 추천해드릴게요!';
      case 4:
        return '가입이 완료되었습니다';
      default:
        return '';
    }
  };

  const adjustScroll = useCallback(() => {
    if (scrollRef.current) {
      const activeElement = document.activeElement;
      if (activeElement && activeElement instanceof HTMLElement) {
        const rect = activeElement.getBoundingClientRect();
        const scrollTop = scrollRef.current.scrollTop;
        const containerHeight = scrollRef.current.clientHeight;
        
        if (rect.bottom > containerHeight) {
          scrollRef.current.scrollTo({
            top: scrollTop + rect.bottom - containerHeight + 20,
            behavior: 'smooth'
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

  return (
    <div className="flex flex-col w-full h-screen bg-black text-white">
      <div className="flex-shrink-0">
        <SubTopNavbar title="회원가입" />
      </div>
      <div className="flex-shrink-0">
        <StepIndicator currentStep={currentStep} />
      </div>
      
      <div ref={scrollRef} className="flex-grow overflow-y-auto">
        <div ref={contentRef} className="max-w-[440px] w-full mx-auto p-6">
          <SignupStepText text={getStepText(currentStep)} />
          <form onSubmit={(e) => e.preventDefault()} className="mt-12">
            {currentStep === 1 && (
              <BasicInfoForm 
                onValidation={handleValidation} 
                onSubmit={handleBasicInfoSubmit}
                onInputChange={adjustScroll}
              />
            )}
            {currentStep === 2 && (
              <UserInfoSignupForm
                onValidChange={handleValidation}
                onSubmit={handleUserInfoSubmit}
              />
            )}
            {currentStep === 3 && <div>곡 선택 (제작 중...)</div>}
            {currentStep === 4 && <div>가입 완료 (제작 중...)</div>}
          </form>
        </div>
      </div>
      
      <div className="flex-shrink-0">
        <FooterButton onClick={handleNext} isValid={isValid}>
          {currentStep === 4 ? '완료' : '다음'}
        </FooterButton>
      </div>
    </div>
  );
};

export default SignupPage;