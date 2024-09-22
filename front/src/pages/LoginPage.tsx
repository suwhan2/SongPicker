import React from 'react';
import SimpleLayout from '../layouts/SimpleLayout';
import LoginTemplate from '../components/template/login/LoginTemplate';

const LoginPage = () => {
  return (
    <SimpleLayout title="로그인" centerContent>
      <LoginTemplate />
    </SimpleLayout>
  );
};

export default LoginPage;
