import React from 'react';
import { FaCheck } from 'react-icons/fa';

type StepIndicatorProps = {
  currentStep: number;
};

const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const steps = ['기본 정보', '회원 정보', '가입완료'];

  return (
    <div className="h-[91px] w-full bg-black border-b border-primary flex items-center justify-center">
      <div className="relative w-full max-w-[600px] pt-6 px-4">
        {/* 배경 바 */}
        <div className="absolute top-6 left-[16.67%] right-[16.67%] h-[3px] bg-white">
          <div
            className="absolute top-0 left-0 h-full bg-secondary transition-all duration-500 ease-in-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>

        {/* 아이콘 및 텍스트 */}
        <ul className="flex justify-between items-start w-full">
          {steps.map((step, index) => (
            <li key={index} className="relative flex flex-col items-center w-[33.33%]">
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center
                  ${
                    index < currentStep
                      ? 'border-secondary bg-secondary text-white'
                      : index === currentStep - 1
                        ? 'border-secondary bg-black'
                        : 'border-white bg-black text-white'
                  }
                  absolute -top-4 left-1/2 transform -translate-x-1/2
                  transition-all duration-300 ease-in-out`}
              >
                {index < currentStep - 1 ? (
                  <FaCheck className="w-3 h-3" />
                ) : index === currentStep - 1 ? (
                  <div className="w-5 h-5 rounded-full bg-white" />
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
              <span
                className={`text-[10px] px-2 py-1 rounded-full mt-6 whitespace-nowrap
                  ${
                    index < currentStep
                      ? 'bg-secondary text-white'
                      : index === currentStep - 1
                        ? 'bg-secondary text-white'
                        : 'bg-white text-gray-400'
                  }
                  transition-all duration-300 ease-in-out`}
              >
                {step}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StepIndicator;
