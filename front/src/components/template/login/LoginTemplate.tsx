import React from 'react';
import LoginLogo from '../../molecules/login/LoginLogo';
import LoginForm from '../../organisms/login/LoginForm';

const LoginTemplate = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-12 w-full px-4">
      <LoginLogo />
      <div className="flex flex-col justify-center w-full max-w-sm">
        <LoginForm />
        <div className="mt-4 text-gray-400 text-center text-sm"></div>
        <div className="mt-4 text-gray-400 text-center">
          <span>회원이 아니신가요? </span>
          <a href="/signup" className="text-purple-500 hover:text-purple-400">SongPicker회원되기</a>
        </div>
      </div>
    </div>
  );
};

export default LoginTemplate;
