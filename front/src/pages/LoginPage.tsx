import React from 'react';
import SubTopNavbar from '../components/molecules/commons/SubTopNavbar';
import LoginTemplate from '../components/template/login/LoginTemplate';

const LoginPage = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <SubTopNavbar title="로그인" />
      <div className="flex-grow flex items-center justify-center">
        <LoginTemplate />
      </div>
    </div>
  );
};

export default LoginPage;
