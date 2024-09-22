import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginInput from '../../atoms/login/LoginInput';
import LoginButton from '../../atoms/login/LoginButton';
import PasswordVisibilityToggle from '../../atoms/commons/PasswordVisibilityToggle';

const LoginForm = () => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!userId && !userPassword) {
      setErrorMessage('아이디와 비밀번호를 입력해주세요.');
    } else if (!userId) {
      setErrorMessage('아이디를 입력해주세요.');
    } else if (!userPassword) {
      setErrorMessage('비밀번호를 입력해주세요.');
    } else {
      // TODO: Implement login logic
      navigate('/');
    }
  };

  return (
    <form className="w-full text-white text-lg">
      <div className="mb-6">
        <label htmlFor="userId" className="block text-white mb-2">
          아이디
        </label>
        <LoginInput
          id="userId"
          type="text"
          placeholder="아이디를 입력해 주세요."
          value={userId}
          onChange={e => setUserId(e.target.value)}
        />
      </div>
      <div className="mb-2 relative">
        <label htmlFor="userPassword" className="block text-white mb-2">
          비밀번호
        </label>
        <LoginInput
          id="userPassword"
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호를 입력해 주세요."
          value={userPassword}
          onChange={e => setUserPassword(e.target.value)}
        />
        <PasswordVisibilityToggle
          showPassword={showPassword}
          onToggle={() => setShowPassword(!showPassword)}
        />
      </div>
      <div className="text-right mb-2">
        <a href="#" className="text-input-text hover:text-white text-sm">
          아이디 • 비밀번호 찾기
        </a>
      </div>
      <div className="h-6 text-red-500 text-sm text-center mb-3">{errorMessage}</div>
      <LoginButton onClick={handleLogin}>로그인</LoginButton>
    </form>
  );
};

export default LoginForm;
