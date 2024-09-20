import React from 'react';
import SongPickerMike from '@/assets/songPickerMike.svg?react';

type SignupCompleteInfoProps = {
  name: string;
};

const SignupCompleteInfo = ({ name = '사용자' }: SignupCompleteInfoProps) => {
  return (
    <div className="flex flex-col items-center justify-start h-full text-xl">
      <SongPickerMike className="w-32 h-32 mr-6" />
      <p className="text-center ">{name}님의 취향분석이 완료되었어요</p>
      <p className="text-center ">회원 가입이 완료 되었어요</p>
    </div>
  );
};

export default SignupCompleteInfo;
