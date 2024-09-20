import React, { ReactNode, useRef } from 'react';
import SubTopNavbar from '../components/molecules/commons/SubTopNavbar';
import FooterButton from '../components/atoms/commons/FooterButton';
import StepIndicator from '../components/molecules/signup/SignupStepIndicator';

type FooterButtonLayoutProps = {
  children: ReactNode;
  title: string;
  buttonText: string;
  onButtonClick: () => void;
  isButtonValid: boolean;
  currentStep?: number;
};

const FooterButtonLayout = ({
  children,
  title,
  buttonText,
  onButtonClick,
  isButtonValid,
  currentStep,
}: FooterButtonLayoutProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col w-full h-screen bg-black text-white">
      <div className="flex-shrink-0">
        <SubTopNavbar title={title} />
      </div>
      {currentStep && (
        <div className="flex-shrink-0">
          <StepIndicator currentStep={currentStep} />
        </div>
      )}
      <div ref={scrollRef} className="flex-grow overflow-y-auto">
        {children}
      </div>
      <div className="flex-shrink-0">
        <FooterButton onClick={onButtonClick} isValid={isButtonValid}>
          {buttonText}
        </FooterButton>
      </div>
    </div>
  );
};

export default FooterButtonLayout;
