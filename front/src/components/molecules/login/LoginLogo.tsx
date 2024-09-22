import React from 'react';
import LoginLogoIcon from '../../atoms/login/LoginLogoIcon';
import LoginLogoText from '../../atoms/login/LoginLogoText';

const LoginLogo = () => {
  return (
    <div className="flex items-center justify-center">
      <LoginLogoIcon />
      <LoginLogoText />
    </div>
  );
};

export default LoginLogo;
